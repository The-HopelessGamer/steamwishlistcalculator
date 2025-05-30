import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import { getStats } from "../stats_utils";
import styles from "./stats_compact.module.css";

type StatsCompactProps = {
	wishlist: WishlistItem[];
	isSalePricing: boolean;
	countryCode: string;
};

export function StatsCompact(props: StatsCompactProps) {
	return (
		<div className={styles.wishlistStatsCompact}>
			{getStats(props.wishlist, props.isSalePricing, props.countryCode).map(
				(stat, index) => (
					<div
						className={classNames([
							styles.wishlistStatCompact,
							!!index && styles.wishlistStatCompactBorder,
						])}
						key={index}
					>
						<div className={styles.wishlistStatCompactLabel}>{stat.label}</div>
						<div className={styles.wishlistStatCompactValue}>{stat.value}</div>
					</div>
				)
			)}
		</div>
	);
}
