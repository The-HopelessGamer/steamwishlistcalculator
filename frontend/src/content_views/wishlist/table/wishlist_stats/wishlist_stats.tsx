import "./wishlist_stats.css";
import { classNames } from "../../../../utils";

type WishlistStat = {
	label: string;
	value: string;
};

type WishlistStatsProps = {
	wishlist: object;
};

export function WishlistStats({ wishlist }: WishlistStatsProps) {
	const stats: WishlistStat[] = [
		{
			label: "Total Price",
			value: "$100",
		},
		{
			label: "Total Items",
			value: "7",
		},
		{
			label: "Without Price",
			value: "7",
		},
		{
			label: "With Price",
			value: "7",
		},
		{
			label: "Free",
			value: "7",
		},
		{
			label: "On Sale",
			value: "7",
		},
		{
			label: "Pre Order",
			value: "7",
		},
		{
			label: "Unlisted",
			value: "7",
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
