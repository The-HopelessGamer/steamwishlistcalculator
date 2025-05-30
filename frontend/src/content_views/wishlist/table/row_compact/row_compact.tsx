import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import styles from "./row_compact.module.css";

type RowCompactProps = {
	item: WishlistItem;
	isSalePricing: boolean;
};

export function RowCompact(props: RowCompactProps) {
	return (
		<tr className={styles.tableRowCompact}>
			<td>
				<div className={styles.tableRowCompactLabel}>Title</div>
				<a
					href={props.item.link()}
					className={styles.tableRowCompactTitleContainer}
					title={props.item.formattedTitle()}
					target="_blank"
				>
					{props.item.formattedTitle()}
				</a>
			</td>
			<td>
				<div className={styles.tableRowCompactLabel}>Release Date</div>
				<div className={styles.tableRowCompactValue}>
					{props.item.formattedReleaseDate()}
				</div>
			</td>
			<td>
				<div className={styles.tableRowCompactLabel}>AppID</div>
				<div className={styles.tableRowCompactValue}>
					{String(props.item.appid())}
				</div>
			</td>
			<td>
				<div className={styles.tableRowCompactLabel}>On Sale</div>
				<div
					className={classNames([
						styles.tableRowCompactValue,
						!props.isSalePricing &&
							props.item.onSale() &&
							styles.tableRowDisabledTableText,
					])}
				>
					{props.item.onSale() ? `${props.item.discountPercentage()}%` : "No"}
				</div>
			</td>
			<td>
				<div className={styles.tableRowCompactLabel}>Pre Order</div>
				<div className={styles.tableRowCompactValue}>
					{props.item.isPreOrder() ? "Yes" : "No"}
				</div>
			</td>
			<td>
				<div className={styles.tableRowCompactLabel}>Price</div>
				<div className={styles.tableRowCompactPriceContainer}>
					{props.isSalePricing ? (
						<>
							<span
								className={`${styles.tableRowCompactPriceText} ${styles.tableRowCompactDisabledTableText} ${styles.tableRowCompactSalePriceTextSmall}`}
							>
								{props.item.formattedOriginalPrice()}
							</span>
							<span className={styles.tableRowCompactPriceText}>
								{props.item.formattedPrice()}
							</span>
						</>
					) : (
						<span className={styles.tableRowCompactPriceText}>
							{props.item.formattedOriginalPrice() ??
								props.item.formattedPrice()}
						</span>
					)}
				</div>
			</td>
		</tr>
	);
}
