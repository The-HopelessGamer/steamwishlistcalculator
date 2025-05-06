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
	countryName: string;
};

export const COUNTRY_MAPPINGS = new Map<string, CountryDetails>([
	["AD", { currency: "EUR", locale: "ca-AD", countryName: "Andorra" }],
	[
		"AE",
		{ currency: "AED", locale: "ar-AE", countryName: "United Arab Emirates" },
	],
	["AF", { currency: "AFN", locale: "ps-AF", countryName: "Afghanistan" }],
	[
		"AG",
		{ currency: "XCD", locale: "en-AG", countryName: "Antigua and Barbuda" },
	],
	["AI", { currency: "XCD", locale: "en-AI", countryName: "Anguilla" }],
	["AL", { currency: "ALL", locale: "sq-AL", countryName: "Albania" }],
	["AM", { currency: "USD", locale: "en-US", countryName: "Armenia" }],
	["AO", { currency: "AOA", locale: "pt-AO", countryName: "Angola" }],
	["AR", { currency: "USD", locale: "en-US", countryName: "Argentina" }],
	["AS", { currency: "USD", locale: "en-AS", countryName: "American Samoa" }],
	["AT", { currency: "EUR", locale: "de-AT", countryName: "Austria" }],
	["AU", { currency: "AUD", locale: "en-AU", countryName: "Australia" }],
	["AW", { currency: "AWG", locale: "nl-AW", countryName: "Aruba" }],
	["AX", { currency: "EUR", locale: "sv-AX", countryName: "Åland Islands" }],
	["AZ", { currency: "USD", locale: "en-US", countryName: "Azerbaijan" }],
	[
		"BA",
		{ currency: "BAM", locale: "bs-BA", countryName: "Bosnia and Herzegovina" },
	],
	["BB", { currency: "BBD", locale: "en-BB", countryName: "Barbados" }],
	["BD", { currency: "USD", locale: "en-US", countryName: "Bangladesh" }],
	["BE", { currency: "EUR", locale: "nl-BE", countryName: "Belgium" }],
	["BF", { currency: "XOF", locale: "fr-BF", countryName: "Burkina Faso" }],
	["BG", { currency: "BGN", locale: "bg-BG", countryName: "Bulgaria" }],
	["BH", { currency: "USD", locale: "en-US", countryName: "Bahrain" }],
	["BI", { currency: "BIF", locale: "fr-BI", countryName: "Burundi" }],
	["BJ", { currency: "XOF", locale: "fr-BJ", countryName: "Benin" }],
	["BL", { currency: "EUR", locale: "fr-BL", countryName: "Saint Barthélemy" }],
	["BM", { currency: "BMD", locale: "en-BM", countryName: "Bermuda" }],
	["BN", { currency: "BND", locale: "ms-BN", countryName: "Brunei" }],
	["BO", { currency: "USD", locale: "en-US", countryName: "Bolivia" }],
	["BR", { currency: "BRL", locale: "pt-BR", countryName: "Brazil" }],
	["BS", { currency: "BSD", locale: "en-BS", countryName: "Bahamas" }],
	["BT", { currency: "USD", locale: "en-US", countryName: "Bhutan" }],
	["BV", { currency: "NOK", locale: "no-BV", countryName: "Bouvet Island" }],
	["BW", { currency: "BWP", locale: "en-BW", countryName: "Botswana" }],
	["BY", { currency: "USD", locale: "en-US", countryName: "Belarus" }],
	["BZ", { currency: "USD", locale: "en-US", countryName: "Belize" }],
	["CA", { currency: "CAD", locale: "en-CA", countryName: "Canada" }],
	["CC", { currency: "AUD", locale: "en-CC", countryName: "Cocos Islands" }],
	["CD", { currency: "CDF", locale: "fr-CD", countryName: "DR Congo" }],
	[
		"CF",
		{
			currency: "XAF",
			locale: "fr-CF",
			countryName: "Central African Republic",
		},
	],
	[
		"CG",
		{ currency: "XAF", locale: "fr-CG", countryName: "Republic of the Congo" },
	],
	["CH", { currency: "CHF", locale: "de-CH", countryName: "Switzerland" }],
	["CI", { currency: "XOF", locale: "fr-CI", countryName: "Ivory Coast" }],
	["CK", { currency: "NZD", locale: "en-CK", countryName: "Cook Islands" }],
	["CL", { currency: "CLP", locale: "es-CL", countryName: "Chile" }],
	["CM", { currency: "XAF", locale: "fr-CM", countryName: "Cameroon" }],
	["CN", { currency: "CNY", locale: "zh-CN", countryName: "China" }],
	["CO", { currency: "COP", locale: "es-CO", countryName: "Colombia" }],
	["CR", { currency: "CRC", locale: "es-CR", countryName: "Costa Rica" }],
	["CU", { currency: "CUP", locale: "es-CU", countryName: "Cuba" }],
	["CV", { currency: "CVE", locale: "pt-CV", countryName: "Cape Verde" }],
	["CW", { currency: "ANG", locale: "nl-CW", countryName: "Curaçao" }],
	["CX", { currency: "AUD", locale: "en-CX", countryName: "Christmas Island" }],
	["CY", { currency: "EUR", locale: "el-CY", countryName: "Cyprus" }],
	["CZ", { currency: "CZK", locale: "cs-CZ", countryName: "Czech Republic" }],
	["DE", { currency: "EUR", locale: "de-DE", countryName: "Germany" }],
	["DJ", { currency: "DJF", locale: "fr-DJ", countryName: "Djibouti" }],
	["DK", { currency: "DKK", locale: "da-DK", countryName: "Denmark" }],
	["DM", { currency: "XCD", locale: "en-DM", countryName: "Dominica" }],
	[
		"DO",
		{ currency: "DOP", locale: "es-DO", countryName: "Dominican Republic" },
	],
	["DZ", { currency: "USD", locale: "en-US", countryName: "Algeria" }],
	["EC", { currency: "USD", locale: "en-US", countryName: "Ecuador" }],
	["EE", { currency: "EUR", locale: "et-EE", countryName: "Estonia" }],
	["EG", { currency: "USD", locale: "en-US", countryName: "Egypt" }],
	["EH", { currency: "MAD", locale: "ar-EH", countryName: "Western Sahara" }],
	["ER", { currency: "ERN", locale: "ti-ER", countryName: "Eritrea" }],
	["ES", { currency: "EUR", locale: "es-ES", countryName: "Spain" }],
	["ET", { currency: "ETB", locale: "am-ET", countryName: "Ethiopia" }],
	["FI", { currency: "EUR", locale: "fi-FI", countryName: "Finland" }],
	["FJ", { currency: "FJD", locale: "en-FJ", countryName: "Fiji" }],
	["FK", { currency: "FKP", locale: "en-FK", countryName: "Falkland Islands" }],
	["FM", { currency: "USD", locale: "en-FM", countryName: "Micronesia" }],
	["FO", { currency: "DKK", locale: "fo-FO", countryName: "Faroe Islands" }],
	["FR", { currency: "EUR", locale: "fr-FR", countryName: "France" }],
	["GA", { currency: "XAF", locale: "fr-GA", countryName: "Gabon" }],
	["GB", { currency: "GBP", locale: "en-GB", countryName: "United Kingdom" }],
	["GD", { currency: "XCD", locale: "en-GD", countryName: "Grenada" }],
	["GE", { currency: "USD", locale: "en-US", countryName: "Georgia" }],
	["GF", { currency: "EUR", locale: "fr-GF", countryName: "French Guiana" }],
	["GG", { currency: "GBP", locale: "en-GG", countryName: "Guernsey" }],
	["GH", { currency: "GHS", locale: "en-GH", countryName: "Ghana" }],
	["GI", { currency: "GIP", locale: "en-GI", countryName: "Gibraltar" }],
	["GL", { currency: "DKK", locale: "kl-GL", countryName: "Greenland" }],
	["GM", { currency: "GMD", locale: "en-GM", countryName: "Gambia" }],
	["GN", { currency: "GNF", locale: "fr-GN", countryName: "Guinea" }],
	["GP", { currency: "EUR", locale: "fr-GP", countryName: "Guadeloupe" }],
	[
		"GQ",
		{ currency: "XAF", locale: "es-GQ", countryName: "Equatorial Guinea" },
	],
	["GR", { currency: "EUR", locale: "el-GR", countryName: "Greece" }],
	["GS", { currency: "GBP", locale: "en-GS", countryName: "South Georgia" }],
	["GT", { currency: "USD", locale: "en-US", countryName: "Guatemala" }],
	["GU", { currency: "USD", locale: "en-GU", countryName: "Guam" }],
	["GW", { currency: "XOF", locale: "pt-GW", countryName: "Guinea-Bissau" }],
	["GY", { currency: "USD", locale: "en-US", countryName: "Guyana" }],
	["HK", { currency: "HKD", locale: "zh-HK", countryName: "Hong Kong" }],
	["HM", { currency: "AUD", locale: "en-HM", countryName: "Heard Island" }],
	["HN", { currency: "USD", locale: "en-US", countryName: "Honduras" }],
	["HR", { currency: "EUR", locale: "hr-HR", countryName: "Croatia" }],
	["HT", { currency: "HTG", locale: "fr-HT", countryName: "Haiti" }],
	["HU", { currency: "HUF", locale: "hu-HU", countryName: "Hungary" }],
	["ID", { currency: "IDR", locale: "id-ID", countryName: "Indonesia" }],
	["IE", { currency: "EUR", locale: "en-IE", countryName: "Ireland" }],
	["IL", { currency: "ILS", locale: "he-IL", countryName: "Israel" }],
	["IM", { currency: "GBP", locale: "en-IM", countryName: "Isle of Man" }],
	["IN", { currency: "INR", locale: "hi-IN", countryName: "India" }],
	[
		"IO",
		{
			currency: "USD",
			locale: "en-IO",
			countryName: "British Indian Ocean Territory",
		},
	],
	["IQ", { currency: "USD", locale: "en-US", countryName: "Iraq" }],
	["IR", { currency: "IRR", locale: "fa-IR", countryName: "Iran" }],
	["IS", { currency: "ISK", locale: "is-IS", countryName: "Iceland" }],
	["IT", { currency: "EUR", locale: "it-IT", countryName: "Italy" }],
	["JE", { currency: "GBP", locale: "en-JE", countryName: "Jersey" }],
	["JM", { currency: "JMD", locale: "en-JM", countryName: "Jamaica" }],
	["JO", { currency: "USD", locale: "en-US", countryName: "Jordan" }],
	["JP", { currency: "JPY", locale: "ja-JP", countryName: "Japan" }],
	["KE", { currency: "KES", locale: "sw-KE", countryName: "Kenya" }],
	["KG", { currency: "USD", locale: "en-US", countryName: "Kyrgyzstan" }],
	["KH", { currency: "KHR", locale: "km-KH", countryName: "Cambodia" }],
	["KI", { currency: "AUD", locale: "en-KI", countryName: "Kiribati" }],
	["KM", { currency: "KMF", locale: "ar-KM", countryName: "Comoros" }],
	[
		"KN",
		{ currency: "XCD", locale: "en-KN", countryName: "Saint Kitts and Nevis" },
	],
	["KP", { currency: "KPW", locale: "ko-KP", countryName: "North Korea" }],
	["KR", { currency: "KRW", locale: "ko-KR", countryName: "South Korea" }],
	["KW", { currency: "KWD", locale: "ar-KW", countryName: "Kuwait" }],
	["KY", { currency: "KYD", locale: "en-KY", countryName: "Cayman Islands" }],
	["KZ", { currency: "KZT", locale: "kk-KZ", countryName: "Kazakhstan" }],
	["LA", { currency: "LAK", locale: "lo-LA", countryName: "Laos" }],
	["LB", { currency: "USD", locale: "en-US", countryName: "Lebanon" }],
	["LC", { currency: "XCD", locale: "en-LC", countryName: "Saint Lucia" }],
	["LI", { currency: "CHF", locale: "de-LI", countryName: "Liechtenstein" }],
	["LK", { currency: "USD", locale: "en-US", countryName: "Sri Lanka" }],
	["LR", { currency: "LRD", locale: "en-LR", countryName: "Liberia" }],
	["LS", { currency: "LSL", locale: "st-LS", countryName: "Lesotho" }],
	["LT", { currency: "EUR", locale: "lt-LT", countryName: "Lithuania" }],
	["LU", { currency: "EUR", locale: "fr-LU", countryName: "Luxembourg" }],
	["LV", { currency: "EUR", locale: "lv-LV", countryName: "Latvia" }],
	["LY", { currency: "USD", locale: "en-US", countryName: "Libya" }],
	["MA", { currency: "USD", locale: "en-US", countryName: "Morocco" }],
	["MC", { currency: "EUR", locale: "fr-MC", countryName: "Monaco" }],
	["MD", { currency: "USD", locale: "en-US", countryName: "Moldova" }],
	["ME", { currency: "EUR", locale: "sr-ME", countryName: "Montenegro" }],
	["MF", { currency: "EUR", locale: "fr-MF", countryName: "Saint Martin" }],
	["MG", { currency: "MGA", locale: "mg-MG", countryName: "Madagascar" }],
	["MH", { currency: "USD", locale: "en-MH", countryName: "Marshall Islands" }],
	["MK", { currency: "MKD", locale: "mk-MK", countryName: "North Macedonia" }],
	["ML", { currency: "XOF", locale: "fr-ML", countryName: "Mali" }],
	["MM", { currency: "MMK", locale: "my-MM", countryName: "Myanmar" }],
	["MN", { currency: "MNT", locale: "mn-MN", countryName: "Mongolia" }],
	["MO", { currency: "MOP", locale: "zh-MO", countryName: "Macau" }],
	[
		"MP",
		{
			currency: "USD",
			locale: "en-MP",
			countryName: "Northern Mariana Islands",
		},
	],
	["MQ", { currency: "EUR", locale: "fr-MQ", countryName: "Martinique" }],
	["MR", { currency: "MRU", locale: "ar-MR", countryName: "Mauritania" }],
	["MS", { currency: "XCD", locale: "en-MS", countryName: "Montserrat" }],
	["MT", { currency: "EUR", locale: "mt-MT", countryName: "Malta" }],
	["MU", { currency: "MUR", locale: "en-MU", countryName: "Mauritius" }],
	["MV", { currency: "MVR", locale: "dv-MV", countryName: "Maldives" }],
	["MW", { currency: "MWK", locale: "ny-MW", countryName: "Malawi" }],
	["MX", { currency: "MXN", locale: "es-MX", countryName: "Mexico" }],
	["MY", { currency: "MYR", locale: "ms-MY", countryName: "Malaysia" }],
	["MZ", { currency: "MZN", locale: "pt-MZ", countryName: "Mozambique" }],
	["NA", { currency: "NAD", locale: "en-NA", countryName: "Namibia" }],
	["NC", { currency: "XPF", locale: "fr-NC", countryName: "New Caledonia" }],
	["NE", { currency: "XOF", locale: "fr-NE", countryName: "Niger" }],
	["NF", { currency: "AUD", locale: "en-NF", countryName: "Norfolk Island" }],
	["NG", { currency: "NGN", locale: "en-NG", countryName: "Nigeria" }],
	["NI", { currency: "USD", locale: "en-US", countryName: "Nicaragua" }],
	["NL", { currency: "EUR", locale: "nl-NL", countryName: "Netherlands" }],
	["NO", { currency: "NOK", locale: "nb-NO", countryName: "Norway" }],
	["NP", { currency: "USD", locale: "en-US", countryName: "Nepal" }],
	["NR", { currency: "AUD", locale: "en-NR", countryName: "Nauru" }],
	["NU", { currency: "NZD", locale: "en-NU", countryName: "Niue" }],
	["NZ", { currency: "NZD", locale: "en-NZ", countryName: "New Zealand" }],
	["OM", { currency: "USD", locale: "en-US", countryName: "Oman" }],
	["PA", { currency: "USD", locale: "en-US", countryName: "Panama" }],
	["PE", { currency: "PEN", locale: "es-PE", countryName: "Peru" }],
	["PF", { currency: "XPF", locale: "fr-PF", countryName: "French Polynesia" }],
	["PG", { currency: "PGK", locale: "en-PG", countryName: "Papua New Guinea" }],
	["PH", { currency: "PHP", locale: "en-PH", countryName: "Philippines" }],
	["PK", { currency: "USD", locale: "en-US", countryName: "Pakistan" }],
	["PL", { currency: "PLN", locale: "pl-PL", countryName: "Poland" }],
	[
		"PM",
		{
			currency: "EUR",
			locale: "fr-PM",
			countryName: "Saint Pierre and Miquelon",
		},
	],
	["PN", { currency: "NZD", locale: "en-PN", countryName: "Pitcairn" }],
	["PR", { currency: "USD", locale: "es-PR", countryName: "Puerto Rico" }],
	["PS", { currency: "USD", locale: "en-US", countryName: "Palestine" }],
	["PT", { currency: "EUR", locale: "pt-PT", countryName: "Portugal" }],
	["PW", { currency: "USD", locale: "en-PW", countryName: "Palau" }],
	["PY", { currency: "USD", locale: "en-US", countryName: "Paraguay" }],
	["QA", { currency: "QAR", locale: "ar-QA", countryName: "Qatar" }],
	["RE", { currency: "EUR", locale: "fr-RE", countryName: "Réunion" }],
	["RO", { currency: "RON", locale: "ro-RO", countryName: "Romania" }],
	["RS", { currency: "RSD", locale: "sr-RS", countryName: "Serbia" }],
	["RU", { currency: "RUB", locale: "ru-RU", countryName: "Russia" }],
	["RW", { currency: "RWF", locale: "rw-RW", countryName: "Rwanda" }],
	["SA", { currency: "SAR", locale: "ar-SA", countryName: "Saudi Arabia" }],
	["SB", { currency: "SBD", locale: "en-SB", countryName: "Solomon Islands" }],
	["SC", { currency: "SCR", locale: "fr-SC", countryName: "Seychelles" }],
	["SD", { currency: "USD", locale: "en-US", countryName: "Sudan" }],
	["SE", { currency: "SEK", locale: "sv-SE", countryName: "Sweden" }],
	["SG", { currency: "SGD", locale: "en-SG", countryName: "Singapore" }],
	["SH", { currency: "SHP", locale: "en-SH", countryName: "Saint Helena" }],
	["SI", { currency: "EUR", locale: "sl-SI", countryName: "Slovenia" }],
	[
		"SJ",
		{ currency: "NOK", locale: "nb-SJ", countryName: "Svalbard and Jan Mayen" },
	],
	["SK", { currency: "EUR", locale: "sk-SK", countryName: "Slovakia" }],
	["SL", { currency: "SLL", locale: "en-SL", countryName: "Sierra Leone" }],
	["SM", { currency: "EUR", locale: "it-SM", countryName: "San Marino" }],
	["SN", { currency: "XOF", locale: "fr-SN", countryName: "Senegal" }],
	["SO", { currency: "SOS", locale: "so-SO", countryName: "Somalia" }],
	["SR", { currency: "USD", locale: "en-US", countryName: "Suriname" }],
	["SS", { currency: "SSP", locale: "en-SS", countryName: "South Sudan" }],
	[
		"ST",
		{ currency: "STN", locale: "pt-ST", countryName: "São Tomé and Príncipe" },
	],
	["SV", { currency: "USD", locale: "en-US", countryName: "El Salvador" }],
	["SX", { currency: "ANG", locale: "nl-SX", countryName: "Sint Maarten" }],
	["SY", { currency: "SYP", locale: "ar-SY", countryName: "Syria" }],
	["SZ", { currency: "SZL", locale: "en-SZ", countryName: "Eswatini" }],
	[
		"TC",
		{
			currency: "USD",
			locale: "en-TC",
			countryName: "Turks and Caicos Islands",
		},
	],
	["TD", { currency: "XAF", locale: "fr-TD", countryName: "Chad" }],
	[
		"TF",
		{
			currency: "EUR",
			locale: "fr-TF",
			countryName: "French Southern Territories",
		},
	],
	["TG", { currency: "XOF", locale: "fr-TG", countryName: "Togo" }],
	["TH", { currency: "THB", locale: "th-TH", countryName: "Thailand" }],
	["TJ", { currency: "USD", locale: "en-US", countryName: "Tajikistan" }],
	["TK", { currency: "NZD", locale: "en-TK", countryName: "Tokelau" }],
	["TL", { currency: "USD", locale: "pt-TL", countryName: "Timor-Leste" }],
	["TM", { currency: "USD", locale: "en-US", countryName: "Turkmenistan" }],
	["TN", { currency: "USD", locale: "en-US", countryName: "Tunisia" }],
	["TO", { currency: "TOP", locale: "to-TO", countryName: "Tonga" }],
	["TR", { currency: "USD", locale: "en-US", countryName: "Turkey" }],
	[
		"TT",
		{ currency: "TTD", locale: "en-TT", countryName: "Trinidad and Tobago" },
	],
	["TV", { currency: "AUD", locale: "en-TV", countryName: "Tuvalu" }],
	["TW", { currency: "TWD", locale: "zh-TW", countryName: "Taiwan" }],
	["TZ", { currency: "TZS", locale: "sw-TZ", countryName: "Tanzania" }],
	["UA", { currency: "UAH", locale: "uk-UA", countryName: "Ukraine" }],
	["UG", { currency: "UGX", locale: "en-UG", countryName: "Uganda" }],
	[
		"UM",
		{
			currency: "USD",
			locale: "en-UM",
			countryName: "U.S. Minor Outlying Islands",
		},
	],
	["US", { currency: "USD", locale: "en-US", countryName: "United States" }],
	["UY", { currency: "UYU", locale: "es-UY", countryName: "Uruguay" }],
	["UZ", { currency: "USD", locale: "en-US", countryName: "Uzbekistan" }],
	["VA", { currency: "EUR", locale: "it-VA", countryName: "Vatican City" }],
	[
		"VC",
		{
			currency: "XCD",
			locale: "en-VC",
			countryName: "Saint Vincent and the Grenadines",
		},
	],
	["VE", { currency: "USD", locale: "en-US", countryName: "Venezuela" }],
	[
		"VG",
		{ currency: "USD", locale: "en-VG", countryName: "British Virgin Islands" },
	],
	[
		"VI",
		{ currency: "USD", locale: "en-VI", countryName: "U.S. Virgin Islands" },
	],
	["VN", { currency: "VND", locale: "vi-VN", countryName: "Vietnam" }],
	["VU", { currency: "VUV", locale: "bi-VU", countryName: "Vanuatu" }],
	[
		"WF",
		{ currency: "XPF", locale: "fr-WF", countryName: "Wallis and Futuna" },
	],
	["WS", { currency: "WST", locale: "sm-WS", countryName: "Samoa" }],
	["YE", { currency: "USD", locale: "en-US", countryName: "Yemen" }],
	["YT", { currency: "EUR", locale: "fr-YT", countryName: "Mayotte" }],
	["ZA", { currency: "ZAR", locale: "en-ZA", countryName: "South Africa" }],
	["ZM", { currency: "ZMW", locale: "en-ZM", countryName: "Zambia" }],
	["ZW", { currency: "USD", locale: "en-ZW", countryName: "Zimbabwe" }],
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
