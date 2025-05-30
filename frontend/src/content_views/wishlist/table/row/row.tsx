import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import styles from "./row.module.css";

type RowProps = {
	item: WishlistItem;
	isSalePricing: boolean;
};

export function Row(props: RowProps) {
	return (
		<tr className={styles.tableRow}>
			<td>
				<a
					href={props.item.link()}
					className={styles.tableRowTitleContainer}
					title={props.item.formattedTitle()}
					target="_blank"
				>
					{props.item.formattedTitle()}
				</a>
			</td>
			<td className={styles.tableRowPropertyContainer}>
				{props.item.formattedReleaseDate()}
			</td>
			<td className={styles.tableRowPropertyContainer}>
				{String(props.item.appid())}
			</td>
			<td
				className={classNames([
					styles.tableRowPropertyContainer,
					!props.isSalePricing &&
						props.item.onSale() &&
						styles.tableRowDisabledTableText,
				])}
			>
				{props.item.onSale() ? `${props.item.discountPercentage()}%` : "No"}
			</td>
			<td className={styles.tableRowPropertyContainer}>
				{props.item.isPreOrder() ? "Yes" : "No"}
			</td>
			<td className={styles.tableRowPropertyContainer}>
				{props.isSalePricing ? (
					<>
						<span
							className={`${styles.tableRowPriceText} ${styles.tableRowDisabledTableText} ${styles.tableRowSalePriceTextSmall}`}
						>
							{props.item.formattedOriginalPrice()}
						</span>
						<span className={styles.tableRowPriceText}>
							{props.item.formattedPrice()}
						</span>
					</>
				) : (
					<span className={styles.tableRowPriceText}>
						{props.item.formattedOriginalPrice() ?? props.item.formattedPrice()}
					</span>
				)}
			</td>
		</tr>
	);
}
