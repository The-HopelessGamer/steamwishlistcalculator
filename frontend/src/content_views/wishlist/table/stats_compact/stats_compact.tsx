import "./stats_compact.css";
import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import { getStats } from "../stats_utils";

type StatsCompactProps = {
	wishlist: WishlistItem[];
	isSalePricing: boolean;
	countryCode: string;
};

export function StatsCompact(props: StatsCompactProps) {
	return (
		<div className="wishlistStatsCompact">
			{getStats(props.wishlist, props.isSalePricing, props.countryCode).map(
				(stat, index) => (
					<div
						className={classNames([
							"wishlistStatCompact",
							!!index && "wishlistStatCompactBorder",
						])}
						key={index}
					>
						<div className="wishlistStatCompactLabel">{stat.label}</div>
						<div className="wishlistStatCompactValue">{stat.value}</div>
					</div>
				)
			)}
		</div>
	);
}
