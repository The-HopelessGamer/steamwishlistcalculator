import express from "express";
import axios from "axios";
import helmet from "helmet";
import protobuf from "protobufjs";
import fs from "fs";
import { query, validationResult } from "express-validator";
import { lookup } from "ip-location-api";

const BASE_URL = "https://api.steampowered.com/";
const COMMON_PROTO = protobuf.loadSync("./proto/common.proto");
const SERVICE_WISHLIST_PROTO = protobuf.loadSync(
	"./proto/service_wishlist.proto"
);

const CWishlist_GetWishlist_Request = SERVICE_WISHLIST_PROTO.lookupType(
	"CWishlist_GetWishlist_Request"
);
const CWishlist_GetWishlist_Response = SERVICE_WISHLIST_PROTO.lookupType(
	"CWishlist_GetWishlist_Response"
);

const CStoreBrowse_GetItems_Request = COMMON_PROTO.lookupType(
	"CStoreBrowse_GetItems_Request"
);
const CStoreBrowse_GetItems_Response = COMMON_PROTO.lookupType(
	"CStoreBrowse_GetItems_Response"
);
const GET_ITEMS_REQUEST_LIMIT = 700;

const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function resolveVanityUrl(vanityUrl) {
	let response = "";
	try {
		response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "ISteamUser/ResolveVanityURL/v1",
			params: {
				key: STEAM_API_KEY,
				vanityUrl,
			},
		});
	} catch {
		return undefined;
	}
	return response.data.response?.steamid;
}

async function getProfileName(steamId) {
	let response = "";
	try {
		response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "ISteamUser/GetPlayerSummaries/v2",
			params: {
				key: STEAM_API_KEY,
				steamids: steamId,
			},
		});
	} catch {
		return undefined;
	}
	return response.data.response?.players[0].personaname;
}

async function getWishlistItemIds(steamId) {
	const getWishlistRequest = CWishlist_GetWishlist_Request.create({
		steamid: steamId,
	});
	const getWishlistRequestBuffer =
		CWishlist_GetWishlist_Request.encode(getWishlistRequest).finish();
	let response = "";
	try {
		response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "IWishlistService/GetWishlist/v1",
			params: {
				input_protobuf_encoded: getWishlistRequestBuffer.toString("base64"),
			},
			responseType: "arraybuffer",
		});
	} catch {
		return undefined;
	}

	const getWishlistResponse = CWishlist_GetWishlist_Response.decode(
		response.data
	);
	const getWishlistResponseObject =
		CWishlist_GetWishlist_Response.toObject(getWishlistResponse);
	return getWishlistResponseObject?.items;
}

async function getItems(appIds, countryCode) {
	let items = [];

	for (let i = 0; i < appIds.length; i += GET_ITEMS_REQUEST_LIMIT) {
		const requestedAppIds = appIds.slice(i, i + GET_ITEMS_REQUEST_LIMIT);

		const getItemsRequest = CStoreBrowse_GetItems_Request.create({
			ids: requestedAppIds.map((appId) => ({ appid: appId })),
			context: {
				language: "english",
				countryCode,
			},
			dataRequest: {
				includeRelease: true,
			},
		});
		const getItemsRequestBuffer =
			CStoreBrowse_GetItems_Request.encode(getItemsRequest).finish();

		let response = "";
		try {
			response = await axios({
				method: "get",
				baseURL: BASE_URL,
				url: "IStoreBrowseService/GetItems/v1",
				params: {
					input_protobuf_encoded: getItemsRequestBuffer.toString("base64"),
				},
				responseType: "arraybuffer",
			});
		} catch {
			return undefined;
		}
		const getItemsResponse = CStoreBrowse_GetItems_Response.decode(
			response.data
		);
		const getItemsResponseObject =
			CStoreBrowse_GetItems_Response.toObject(getItemsResponse);

		items = items.concat(getItemsResponseObject.storeItems);
	}

	return items;
}

async function getWishlistItems(steamId, countryCode) {
	let countryCodeCheck = "";
	let countryCodesList = [
		"AR",
		"AU",
		"AZ",
		"BR",
		"GB",
		"CA",
		"CR",
		"IN",
		"ID",
		"IL",
		"JP",
		"KZ",
		"KW",
		"MX",
		"EU",
		"NL",
		"NZ",
		"NO",
		"PH",
		"PL",
		"QA",
		"RU",
		"SG",
		"TH",
		"TR",
		"UA",
		"US",
		"VN",
	];
	countryCodeCheck = countryCodesList.includes(countryCode);
	if (countryCodeCheck !== false) {
		const wishlistItems = await getWishlistItemIds(steamId);
		if (wishlistItems !== undefined) {
			const items = await getItems(
				wishlistItems.map((item) => item.appid),
				countryCode
			);
			return items;
		}
	}
	return undefined;
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

	app.use(express.static("../frontend/dist"));

	router.get(
		"/resolveVanityUrl",
		query("vanityUrl").notEmpty().escape(),
		async function (req, res) {
			const result = validationResult(req);
			if (result.isEmpty()) {
				const steamId = await resolveVanityUrl(req.query.vanityUrl);
				if (steamId !== undefined) {
					return res.send(steamId);
				}
			}
			res.status(400);
			res.send("Error: Invalid Steam ID");
		}
	);

	router.get(
		"/wishlist",
		query("steamId" && "countryCode")
			.notEmpty()
			.escape(),
		async function (req, res) {
			const result = validationResult(req);

			if (result.isEmpty()) {
				const wishlist = await getWishlistItems(
					req.query.steamId,
					req.query.countryCode
				);
				if (wishlist !== undefined) {
					return res.send(JSON.stringify(wishlist));
				}
				res.status(400);
				return res.send("Error: Wishlist Empty or Private");
			}
			res.status(400);
			res.send("Error: Invalid Shareable Link");
		}
	);

	router.get(
		"/getProfileName",
		query("steamId").notEmpty().escape(),
		async function (req, res) {
			const result = validationResult(req);
			if (result.isEmpty()) {
				const profileName = await getProfileName(req.query.steamId);
				return res.send(profileName);
			}
			res.status(400);
			res.send("Error: Invalid Steam ID");
		}
	);

	router.get("/counterRead", async function (req, res) {
		const data = fs.readFileSync("./counter.txt", "utf8");
		res.send(data);
	});

	router.post("/counterUpdate", async function (req, res) {
		const count = fs.readFileSync("./counter.txt", "utf8");
		count++;
		fs.writeFileSync("./counter.txt", count.toString());
		res.send();
	});

	router.get("/ip2Country", async function (req, res) {
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const location = lookup(ip);
		if (location !== null) {
			res.send(location.country);
		} else {
			res.status(400);
			res.send("Error: Unable to get IP Address");
		}
	});

	app.use("/api", router);
	app.listen(3000);
}

main();
