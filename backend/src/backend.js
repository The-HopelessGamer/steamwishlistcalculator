import express from "express";
import axios from "axios";
import helmet from "helmet";
import protobuf from "protobufjs";
import fs from "fs";
import { query, validationResult } from "express-validator";
import { lookup } from "ip-location-api";

const BASE_URL = "https://api.steampowered.com/";
const COMMON_PROTO = protobuf.loadSync("../protos/src/common.proto");
const SERVICE_WISHLIST_PROTO = protobuf.loadSync(
	"../protos/src/service_wishlist.proto"
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

async function getProfileName(steamId) {
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

async function getWishlistItemIds(steamId) {
	const getWishlistRequest = CWishlist_GetWishlist_Request.create({
		steamid: steamId,
	});

	const getWishlistRequestBuffer =
		CWishlist_GetWishlist_Request.encode(getWishlistRequest).finish();

	try {
		const response = await axios({
			method: "get",
			baseURL: BASE_URL,
			url: "IWishlistService/GetWishlist/v1",
			params: {
				input_protobuf_encoded: getWishlistRequestBuffer.toString("base64"),
			},
			responseType: "arraybuffer",
		});

		const getWishlistResponse = CWishlist_GetWishlist_Response.decode(
			response.data
		);

		const getWishlistResponseObject = CWishlist_GetWishlist_Response.toObject(
			getWishlistResponse,
			{ longs: Number }
		);

		return getWishlistResponseObject?.items;
	} catch {
		return undefined;
	}
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

		try {
			const response = await axios({
				method: "get",
				baseURL: BASE_URL,
				url: "IStoreBrowseService/GetItems/v1",
				params: {
					input_protobuf_encoded: getItemsRequestBuffer.toString("base64"),
				},
				responseType: "arraybuffer",
			});

			const getItemsResponse = CStoreBrowse_GetItems_Response.decode(
				response.data
			);

			const getItemsResponseObject = CStoreBrowse_GetItems_Response.toObject(
				getItemsResponse,
				{ longs: Number }
			);

			items = items.concat(getItemsResponseObject.storeItems);
		} catch {
			return undefined;
		}
	}

	return items;
}

function isCountryCodeValid(countryCode) {
	const countryCodesList = [
		"AD",
		"AE",
		"AF",
		"AG",
		"AI",
		"AL",
		"AM",
		"AO",
		"AR",
		"AS",
		"AT",
		"AU",
		"AW",
		"AX",
		"AZ",
		"BA",
		"BB",
		"BD",
		"BE",
		"BF",
		"BG",
		"BH",
		"BI",
		"BJ",
		"BL",
		"BM",
		"BN",
		"BO",
		"BQ",
		"BR",
		"BS",
		"BT",
		"BV",
		"BW",
		"BY",
		"BZ",
		"CA",
		"CC",
		"CD",
		"CF",
		"CG",
		"CH",
		"CI",
		"CK",
		"CL",
		"CM",
		"CN",
		"CO",
		"CR",
		"CU",
		"CV",
		"CW",
		"CX",
		"CY",
		"CZ",
		"DE",
		"DJ",
		"DK",
		"DM",
		"DO",
		"DZ",
		"EC",
		"EE",
		"EG",
		"EH",
		"ER",
		"ES",
		"ET",
		"FI",
		"FJ",
		"FK",
		"FM",
		"FO",
		"FR",
		"GA",
		"GB",
		"GD",
		"GE",
		"GF",
		"GG",
		"GH",
		"GI",
		"GL",
		"GM",
		"GN",
		"GP",
		"GQ",
		"GR",
		"GS",
		"GT",
		"GU",
		"GW",
		"GY",
		"HK",
		"HM",
		"HN",
		"HR",
		"HT",
		"HU",
		"ID",
		"IE",
		"IL",
		"IM",
		"IN",
		"IO",
		"IQ",
		"IR",
		"IS",
		"IT",
		"JE",
		"JM",
		"JO",
		"JP",
		"KE",
		"KG",
		"KH",
		"KI",
		"KM",
		"KN",
		"KP",
		"KR",
		"KW",
		"KY",
		"KZ",
		"LA",
		"LB",
		"LC",
		"LI",
		"LK",
		"LR",
		"LS",
		"LT",
		"LU",
		"LV",
		"LY",
		"MA",
		"MC",
		"MD",
		"ME",
		"MF",
		"MG",
		"MH",
		"MK",
		"ML",
		"MM",
		"MN",
		"MO",
		"MP",
		"MQ",
		"MR",
		"MS",
		"MT",
		"MU",
		"MV",
		"MW",
		"MX",
		"MY",
		"MZ",
		"NA",
		"NC",
		"NE",
		"NF",
		"NG",
		"NI",
		"NL",
		"NO",
		"NP",
		"NR",
		"NU",
		"NZ",
		"OM",
		"PA",
		"PE",
		"PF",
		"PG",
		"PH",
		"PK",
		"PL",
		"PM",
		"PN",
		"PR",
		"PS",
		"PT",
		"PW",
		"PY",
		"QA",
		"RE",
		"RO",
		"RS",
		"RU",
		"RW",
		"SA",
		"SB",
		"SC",
		"SD",
		"SE",
		"SG",
		"SH",
		"SI",
		"SJ",
		"SK",
		"SL",
		"SM",
		"SN",
		"SO",
		"SR",
		"SS",
		"ST",
		"SV",
		"SX",
		"SY",
		"SZ",
		"TC",
		"TD",
		"TF",
		"TG",
		"TH",
		"TJ",
		"TK",
		"TL",
		"TM",
		"TN",
		"TO",
		"TR",
		"TT",
		"TV",
		"TW",
		"TZ",
		"UA",
		"UG",
		"UM",
		"US",
		"UY",
		"UZ",
		"VA",
		"VC",
		"VE",
		"VG",
		"VI",
		"VN",
		"VU",
		"WF",
		"WS",
		"YE",
		"YT",
		"ZA",
		"ZM",
		"ZW",
	];
	return countryCodesList.includes(countryCode);
}

async function getWishlistItems(steamId, countryCode) {
	const wishlistItems = await getWishlistItemIds(steamId);

	if (wishlistItems === undefined) {
		return undefined;
	}

	const items = await getItems(
		wishlistItems.map((item) => item.appid),
		countryCode
	);

	return items;
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

			const steamId = await resolveVanityUrl(req.query.vanityUrl);

			if (steamId === undefined) {
				res.status(500);
				return res.send("Failed Fetching Steam ID");
			}

			return res.send(steamId);
		}
	);

	router.get(
		"/wishlist",
		query("steamId" && "countryCode")
			.notEmpty()
			.escape(),
		async function (req, res) {
			const result = validationResult(req);

			if (!result.isEmpty()) {
				res.status(400);
				return res.send("Invalid Shareable Link");
			}

			if (!isCountryCodeValid(req.query.countryCode)) {
				res.status(400);
				return res.send("Unsupported Country Code");
			}

			const wishlist = await getWishlistItems(
				req.query.steamId,
				req.query.countryCode
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
			const profileName = await getProfileName(req.query.steamId);
			return res.send(profileName);
		}
	);

	router.get("/counterRead", async function (req, res) {
		const data = fs.readFileSync("./counter.txt", "utf8");
		res.send(data);
	});

	router.post("/counterUpdate", async function (req, res) {
		let count = fs.readFileSync("./counter.txt", "utf8");
		count++;
		fs.writeFileSync("./counter.txt", count.toString());
		res.send();
	});

	router.get("/ip2Country", async function (req, res) {
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const location = lookup(ip);
		if (location === null) {
			res.status(400);
			return res.send("Unable to get IP Address");
		}

		if (!isCountryCodeValid(location.country)) {
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
