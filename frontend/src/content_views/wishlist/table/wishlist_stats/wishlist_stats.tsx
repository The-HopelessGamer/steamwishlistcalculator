import "./wishlist_stats.css";
import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";

type WishlistStat = {
	label: string;
	value: string;
};

type WishlistStatsProps = {
	wishlist: WishlistItem[];
	isSalePricing: boolean;
};

export function WishlistStats(props: WishlistStatsProps) {
	const totalPriceInCents = props.wishlist.reduce(
		(total, item) =>
			total +
			((props.isSalePricing
				? item.price()
				: item.originalPrice() ?? item.price()) ?? 0),
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
			value: props.wishlist.length.toString(),
		},
		{
			label: "Free",
			value: props.wishlist
				.reduce((total, item) => total + (item.isFree() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "On Sale",
			value: props.wishlist
				.reduce((total, item) => total + (item.onSale() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "Pre Order",
			value: props.wishlist
				.reduce((total, item) => total + (item.isPreOrder() ? 1 : 0), 0)
				.toString(),
		},
		{
			label: "Unlisted",
			value: props.wishlist
				.reduce((total, item) => total + (item.isUnlisted() ? 1 : 0), 0)
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
					<div className="wishlistStatLabel">{stat.label}</div>
					<div className="wishlistStatValue">{stat.value}</div>
				</div>
			))}
		</div>
	);
}
