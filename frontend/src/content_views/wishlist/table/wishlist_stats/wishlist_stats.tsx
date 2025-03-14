import "./wishlist_stats.css";
import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";

type WishlistStat = {
	label: string;
	value: string;
};

type WishlistStatsProps = {
	wishlist: WishlistItem[];
};

export function WishlistStats({ wishlist }: WishlistStatsProps) {
	const totalPriceInCents = wishlist.reduce(
		(total, item) => total + (item.price() ?? 0),
		0
	);

	const totalPriceFormatted = (totalPriceInCents / 100).toLocaleString(
		"en-US",
		{
			style: "currency",
			currency: "USD",
		}
	);

	const stats: WishlistStat[] = [
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
				.reduce((total, item) => total + (item.isUnlisted() ? 0 : 1), 0)
				.toString(),
		},
	];
	return (
		<div className="wishlistStats">
			{stats.map((stat, index) => (
				<div
					className={classNames([
						"wishlistStat",
						!!index && "wishlistStatBorder",
					])}
					key={index}
				>
					<div>{stat.label}</div>
					<div>{stat.value}</div>
				</div>
			))}
		</div>
	);
}
