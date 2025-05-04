import "./stats.css";
import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import { getStats } from "../stats_utils";

type StatsProps = {
	wishlist: WishlistItem[];
	isSalePricing: boolean;
	countryCode: string;
};

export function Stats(props: StatsProps) {
	return (
		<div className="wishlistStats">
			{getStats(props.wishlist, props.isSalePricing, props.countryCode).map(
				(stat, index) => (
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
				)
			)}
		</div>
	);
}
