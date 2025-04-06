import { WishlistItem } from "../../../wishlist_item";

type Stat = {
	label: string;
	value: string;
};

export function getStats(
	wishlist: WishlistItem[],
	isSalePricing: boolean
): Stat[] {
	const totalPriceInCents = wishlist.reduce(
		(total, item) =>
			total +
			((isSalePricing ? item.price() : item.originalPrice() ?? item.price()) ??
				0),
		0
	);

	const totalPriceFormatted = (totalPriceInCents / 100).toLocaleString(
		"en-US",
		{
			style: "currency",
			currency: "USD",
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
