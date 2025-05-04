import { WishlistItem } from "../../../wishlist_item";

type Stat = {
	label: string;
	value: string;
};

type CountryDetails = {
	currency: string;
	locale: string;
};

export const COUNTRY_MAPPINGS = new Map<string, CountryDetails>([
	["AR", { currency: "ARS", locale: "es-AR" }],
	["AU", { currency: "AUD", locale: "en-AU" }],
	["AZ", { currency: "AZN", locale: "az-AZ" }],
	["BR", { currency: "BRL", locale: "pt-BR" }],
	["GB", { currency: "GBP", locale: "en-GB" }],
	["BY", { currency: "BYN", locale: "be-BY" }],
	["CA", { currency: "CAD", locale: "en-CA" }],
	["CH", { currency: "CHF", locale: "de-CH" }],
	["CL", { currency: "CLP", locale: "es-CL" }],
	["CN", { currency: "CNY", locale: "zh-CN" }],
	["CO", { currency: "COP", locale: "es-CO" }],
	["CR", { currency: "CRC", locale: "es-CR" }],
	["HK", { currency: "HKD", locale: "zh-HK" }],
	["IN", { currency: "INR", locale: "en-IN" }],
	["ID", { currency: "IDR", locale: "id-ID" }],
	["IL", { currency: "ILS", locale: "he-IL" }],
	["JP", { currency: "JPY", locale: "ja-JP" }],
	["KZ", { currency: "KZT", locale: "kk-KZ" }],
	["KR", { currency: "KRW", locale: "ko-KR" }],
	["KW", { currency: "KWD", locale: "ar-KW" }],
	["MY", { currency: "MYR", locale: "ms-MY" }],
	["MX", { currency: "MXN", locale: "es-MX" }],
	["EU", { currency: "EUR", locale: "en-EU" }],
	["NZ", { currency: "NZD", locale: "en-NZ" }],
	["NO", { currency: "NOK", locale: "nb-NO" }],
	["PE", { currency: "PEN", locale: "es-PE" }],
	["PH", { currency: "PHP", locale: "en-PH" }],
	["PL", { currency: "PLN", locale: "pl-PL" }],
	["QA", { currency: "QAR", locale: "ar-QA" }],
	["RU", { currency: "RUB", locale: "ru-RU" }],
	["SA", { currency: "SAR", locale: "ar-SA" }],
	["SG", { currency: "SGD", locale: "en-SG" }],
	["ZA", { currency: "ZAR", locale: "en-ZA" }],
	["TH", { currency: "THB", locale: "th-TH" }],
	["TR", { currency: "TRY", locale: "tr-TR" }],
	["TW", { currency: "TWD", locale: "zh-TW" }],
	["UA", { currency: "UAH", locale: "uk-UA" }],
	["US", { currency: "USD", locale: "en-US" }],
	["UY", { currency: "UYU", locale: "es-UY" }],
	["VN", { currency: "VND", locale: "vi-VN" }],
]);

export function getStats(
	wishlist: WishlistItem[],
	isSalePricing: boolean,
	countryCode: string
): Stat[] {
	const totalPriceInCents = wishlist.reduce(
		(total, item) =>
			total +
			((isSalePricing ? item.price() : item.originalPrice() ?? item.price()) ??
				0),
		0
	);

	const totalPriceFormatted = (totalPriceInCents / 100).toLocaleString(
		COUNTRY_MAPPINGS.get(countryCode)?.locale,
		{
			style: "currency",
			currency: COUNTRY_MAPPINGS.get(countryCode)?.currency,
		}
	);

	return [
		{
			label: "Total Price",
			value: totalPriceFormatted,
		},
		{
			label: "Total Items",
			value: wishlist.length.toString(),
		},
		{
			label: "Free",
			value: wishlist
				.reduce((total, item) => total + (item.isFree() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "On Sale",
			value: wishlist
				.reduce((total, item) => total + (item.onSale() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "Pre Order",
			value: wishlist
				.reduce((total, item) => total + (item.isPreOrder() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "Unlisted",
			value: wishlist
				.reduce((total, item) => total + (item.isUnlisted() ? 1 : 0), 0)
				.toString(),
		},
	];
}
