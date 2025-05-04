import { useState, useEffect } from "react";

export function classNames(classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(" ");
}

export const enum LoadState {
	Pending,
	Loading,
	Loaded,
	Failed,
}

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(query).matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
		mediaQuery.addEventListener("change", listener);

		return () => mediaQuery.removeEventListener("change", listener);
	}, [query]);

	return matches;
}

type CountryDetails = {
	currency: string;
	locale: string;
	currencyName: string;
};

export const COUNTRY_MAPPINGS = new Map<string, CountryDetails>([
	["AR", { currency: "ARS", locale: "es-AR", currencyName: "Argentine Peso" }],
	[
		"AU",
		{ currency: "AUD", locale: "en-AU", currencyName: "Australian Dollar" },
	],
	[
		"AZ",
		{ currency: "AZN", locale: "az-AZ", currencyName: "Azerbaijani Manat" },
	],
	["BR", { currency: "BRL", locale: "pt-BR", currencyName: "Brazilian Real" }],
	["GB", { currency: "GBP", locale: "en-GB", currencyName: "British Pound" }],
	[
		"BY",
		{ currency: "BYN", locale: "be-BY", currencyName: "Belarusian Ruble" },
	],
	["CA", { currency: "CAD", locale: "en-CA", currencyName: "Canadian Dollar" }],
	["CH", { currency: "CHF", locale: "de-CH", currencyName: "Swiss Franc" }],
	["CL", { currency: "CLP", locale: "es-CL", currencyName: "Chilean Peso" }],
	["CN", { currency: "CNY", locale: "zh-CN", currencyName: "Chinese Yuan" }],
	["CO", { currency: "COP", locale: "es-CO", currencyName: "Colombian Peso" }],
	[
		"CR",
		{ currency: "CRC", locale: "es-CR", currencyName: "Costa Rican Colón" },
	],
	[
		"HK",
		{ currency: "HKD", locale: "zh-HK", currencyName: "Hong Kong Dollar" },
	],
	["IN", { currency: "INR", locale: "en-IN", currencyName: "Indian Rupee" }],
	[
		"ID",
		{ currency: "IDR", locale: "id-ID", currencyName: "Indonesian Rupiah" },
	],
	[
		"IL",
		{ currency: "ILS", locale: "he-IL", currencyName: "Israeli New Shekel" },
	],
	["JP", { currency: "JPY", locale: "ja-JP", currencyName: "Japanese Yen" }],
	[
		"KZ",
		{ currency: "KZT", locale: "kk-KZ", currencyName: "Kazakhstani Tenge" },
	],
	[
		"KR",
		{ currency: "KRW", locale: "ko-KR", currencyName: "South Korean Won" },
	],
	["KW", { currency: "KWD", locale: "en-US", currencyName: "Kuwaiti Dinar" }],
	[
		"MY",
		{ currency: "MYR", locale: "ms-MY", currencyName: "Malaysian Ringgit" },
	],
	["MX", { currency: "MXN", locale: "es-MX", currencyName: "Mexican Peso" }],
	["EU", { currency: "EUR", locale: "en-EU", currencyName: "Euro" }],
	[
		"NZ",
		{ currency: "NZD", locale: "en-NZ", currencyName: "New Zealand Dollar" },
	],
	["NO", { currency: "NOK", locale: "nb-NO", currencyName: "Norwegian Krone" }],
	["PE", { currency: "PEN", locale: "es-PE", currencyName: "Peruvian Sol" }],
	["PH", { currency: "PHP", locale: "en-PH", currencyName: "Philippine Peso" }],
	["PL", { currency: "PLN", locale: "pl-PL", currencyName: "Polish Złoty" }],
	["QA", { currency: "QAR", locale: "ar-QA", currencyName: "Qatari Riyal" }],
	["RU", { currency: "RUB", locale: "ru-RU", currencyName: "Russian Ruble" }],
	["SA", { currency: "SAR", locale: "ar-SA", currencyName: "Saudi Riyal" }],
	[
		"SG",
		{ currency: "SGD", locale: "en-SG", currencyName: "Singapore Dollar" },
	],
	[
		"ZA",
		{ currency: "ZAR", locale: "en-ZA", currencyName: "South African Rand" },
	],
	["TH", { currency: "THB", locale: "th-TH", currencyName: "Thai Baht" }],
	["TR", { currency: "TRY", locale: "tr-TR", currencyName: "Turkish Lira" }],
	[
		"TW",
		{ currency: "TWD", locale: "zh-TW", currencyName: "New Taiwan Dollar" },
	],
	[
		"UA",
		{ currency: "UAH", locale: "uk-UA", currencyName: "Ukrainian Hryvnia" },
	],
	["US", { currency: "USD", locale: "en-US", currencyName: "US Dollar" }],
	["UY", { currency: "UYU", locale: "es-UY", currencyName: "Uruguayan Peso" }],
	["VN", { currency: "VND", locale: "vi-VN", currencyName: "Vietnamese Dong" }],
]);

export function extractSteamId(input: string): string {
	if (
		input.includes("steamcommunity.com") ||
		input.includes("store.steampowered.com")
	) {
		const cleanUrl = input.replace(/\/+$/, "").split("?")[0];

		const segments = cleanUrl.split("/").filter((part) => part !== "");

		const idIndex = segments.findIndex(
			(part) =>
				part === "id" ||
				part === "profiles" ||
				(part === "wishlist" &&
					segments[segments.indexOf(part) + 1] === "profiles")
		);

		if (idIndex !== -1 && idIndex + 1 < segments.length) {
			if (segments[idIndex] === "wishlist") {
				return segments[idIndex + 2];
			}
			return segments[idIndex + 1];
		}
	}
	return input;
}
