import express from "express";
import axios from "axios";
import https from "https";
import { Pool } from "undici";
import helmet from "helmet";
import protobuf from "protobufjs";
import fs from "fs";
import { query, validationResult } from "express-validator";
import { lookup } from "ip-location-api";
import { countryCodesList } from "./country_codes.ts";
import common_proto from "protos/common.js";
import service_wishlist from "protos/service_wishlist.js";

const BASE_URL = "https://api.steampowered.com/";


const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function resolveVanityUrl(vanityUrl: string) {
	try {
		const response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "ISteamUser/ResolveVanityURL/v1",
			params: {
				key: STEAM_API_KEY,
				vanityUrl,
			},
		});
		return response.data.response?.steamid;
	} catch {
		return undefined;
	}
}

async function getProfileName(steamId: string) {
	try {
		const response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "ISteamUser/GetPlayerSummaries/v2",
			params: {
				key: STEAM_API_KEY,
				steamids: steamId,
			},
		});
		return response.data.response?.players[0].personaname;
	} catch {
		return undefined;
	}
}

async function getWishlistItems(steamId: string) {
	const getWishlistRequest = service_wishlist.CWishlistGetWishlistRequest.create({
		steamid: steamId,
	});

	const getWishlistRequestBuffer =
		service_wishlist.CWishlistGetWishlistRequest.encode(getWishlistRequest).finish();

	try {
		const response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "IWishlistService/GetWishlist/v1",
			params: {
				input_protobuf_encoded: Buffer.from(getWishlistRequestBuffer).toString('base64'),
			},
			responseType: "arraybuffer",
		});

		const getWishlistResponse = service_wishlist.CWishlistGetWishlistResponse.decode(response.data);
		return getWishlistResponse?.items ?? [];
	} catch {
		return undefined;
	}
}

async function getWishlistItemsFiltered(steamId: string, countryCode: string) {
	const getWishlistRequest = service_wishlist.CWishlistGetWishlistSortedFilteredRequest.create({
		steamid: steamId,
		dataRequest: {
			includeRelease: true,
			includeAllPurchaseOptions: true,
			includeBasicInfo: true,
			includeLinks: true,
		},
		filters: {},
		context: {
			language: "english",
			countryCode: countryCode,
		},
	});

	const getWishlistRequestBuffer =
		service_wishlist.CWishlistGetWishlistSortedFilteredRequest.encode(getWishlistRequest).finish();

	try {
		const response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "IWishlistService/GetWishlistSortedFiltered/v1",
			params: {
				input_protobuf_encoded: Buffer.from(getWishlistRequestBuffer).toString('base64'),
			},
			responseType: "arraybuffer",
		});

		const getWishlistResponse = service_wishlist.CWishlistGetWishlistSortedFilteredResponse.decode(response.data);
		return getWishlistResponse?.items ?? [];
	} catch {
		return undefined;
	}
}

function isCountryCodeValid(countryCode: string) {
	return countryCodesList.includes(countryCode);
}

async function getStoreItemsWithPriority(steamId: string, countryCode: string) {
	const storeItems = await getWishlistItemsFiltered(steamId, countryCode);

	console.log(storeItems);

	if (storeItems === undefined) {
		return undefined;
	}

	/*
		const storeItems = await getStoreItems(
			wishlistItems.map((wishlistItem) => wishlistItem.appid).filter(appid => appid !== undefined),
			countryCode
		);
	*/

	return storeItems;
}

function main() {
	const app = express();

	const router = express.Router();

	router.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: [
						"'self'",
						"'unsafe-eval'",
						"'unsafe-inline'",
						"https://www.googletagmanager.com",
						"*.googletagmanager.com",
					],
					scriptSrcAttr: ["'unsafe-inline'"],
				},
			},
		})
	);

	router.get(
		"/resolveVanityUrl",
		query("vanityUrl").notEmpty().escape(),
		async function (req, res) {
			const result = validationResult(req);

			if (!result.isEmpty()) {
				res.status(400);
				return res.send("Invalid Steam ID");
			}

			const steamId = await resolveVanityUrl(req.query?.vanityUrl);

			if (steamId === undefined) {
				res.status(500);
				return res.send("Failed Fetching Steam ID");
			}

			return res.send(steamId);
		}
	);

	router.get(
		"/wishlist",
		query(["steamId", "countryCode"])
			.notEmpty()
			.escape(),
		async function (req, res) {
			const result = validationResult(req);

			if (!result.isEmpty()) {
				res.status(400);
				return res.send("Invalid Shareable Link");
			}

			if (!isCountryCodeValid(req.query?.countryCode)) {
				res.status(400);
				return res.send("Unsupported Country Code");
			}

			const wishlist = await getStoreItemsWithPriority(
				req.query?.steamId,
				req.query?.countryCode
			);

			if (wishlist === undefined) {
				res.status(400);
				return res.send("Wishlist Empty or Private");
			}

			return res.send(JSON.stringify(wishlist));
		}
	);

	router.get(
		"/getProfileName",
		query("steamId").notEmpty().escape(),
		async function (req, res) {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				res.status(400);
				return res.send("Invalid Steam ID");
			}
			const profileName = await getProfileName(req.query?.steamId);
			return res.send(profileName);
		}
	);

	router.get("/counterRead", async function (req, res) {
		const data = fs.readFileSync("./counter.txt", "utf8");
		res.send(data);
	});

	router.post("/counterUpdate", async function (req, res) {
		let count = Number(fs.readFileSync("./counter.txt", "utf8"));
		count++;
		fs.writeFileSync("./counter.txt", count.toString());
		res.send();
	});

	router.get("/ip2Country", async function (req, res) {
		const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
		const location = await Promise.resolve(lookup(ip));
		if (location === null) {
			res.status(400);
			return res.send("Unable to get IP Address");
		}

		if (!location.country || !isCountryCodeValid(location.country)) {
			res.status(400);
			return res.send("Unsupported Country Code");
		}

		return res.send(location.country);
	});

	app.use("/api", router);
	app.use(express.static("../frontend/dist"));
	app.get("*", (req, res) => {
		res.sendFile("index.html", { root: "../frontend/dist" });
	});
	app.listen(3000);
}

main();
