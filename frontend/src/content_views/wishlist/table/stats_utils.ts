import { COUNTRY_MAPPINGS } from "../../../utils";
import { WishlistItem } from "../../../wishlist_item";

type Stat = {
	label: string;
	value: string;
};

export function getStats(
	wishlist: WishlistItem[],
	isSalePricing: boolean,
	countryCode: string
): Stat[] {

	const totalPriceInCents = wishlist.reduce(
		(total, item) =>
			total +
			Number((isSalePricing ? item.price() : item.originalPrice() ?? item.price()) ??
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
			value: new Intl.NumberFormat(COUNTRY_MAPPINGS.get(countryCode)?.locale).format(wishlist.length)
		},
		{
			label: "Free",
			value: new Intl.NumberFormat(COUNTRY_MAPPINGS.get(countryCode)?.locale).format(wishlist
				.reduce((total, item) => total + (item.isFree() ? 1 : 0), 0)),
		},
		{
			label: "On Sale",
			value: new Intl.NumberFormat(COUNTRY_MAPPINGS.get(countryCode)?.locale).format(wishlist
				.reduce((total, item) => total + (item.onSale() ? 1 : 0), 0)),
		},
		{
			label: "Pre Order",
			value: new Intl.NumberFormat(COUNTRY_MAPPINGS.get(countryCode)?.locale).format(wishlist
				.reduce((total, item) => total + (item.isPreOrder() ? 1 : 0), 0)),
		},
		{
			label: "Unlisted",
			value: new Intl.NumberFormat(COUNTRY_MAPPINGS.get(countryCode)?.locale).format(wishlist
				.reduce((total, item) => total + (item.isUnlisted() ? 1 : 0), 0)),
		},
	];
}
