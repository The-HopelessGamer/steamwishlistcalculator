import styles from "./stats.module.css";
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
		<div className={styles.wishlistStats}>
			{getStats(props.wishlist, props.isSalePricing, props.countryCode).map(
				(stat, index) => (
					<div
						className={classNames([
							styles.wishlistStat,
							!!index && styles.wishlistStatBorder,
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
