import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import "./row_compact.css";

type RowCompactProps = {
	item: WishlistItem;
	isSalePricing: boolean;
};

export function RowCompact(props: RowCompactProps) {
	return (
		<tr className="tableRowCompact">
			<td>
				<a
					href={props.item.link()}
					className="tableRowCompactTitleContainer"
					title={props.item.formattedTitle()}
					target="_blank"
				>
					{props.item.formattedTitle()}
				</a>
			</td>
			<td className="tableRowCompactPropertyContainer">
				{props.item.formattedReleaseDate()}
			</td>
			<td className="tableRowCompactPropertyContainer">
				{String(props.item.appid())}
			</td>
			<td
				className={classNames([
					"tableRowPropertyContainer",
					!props.isSalePricing &&
						props.item.onSale() &&
						"tableRowDisabledTableText",
				])}
			>
				{props.item.onSale() ? `${props.item.discountPercentage()}%` : "No"}
			</td>
			<td className="tableRowCompactPropertyContainer">
				{props.item.isPreOrder() ? "Yes" : "No"}
			</td>
			<td className="tableRowCompactPropertyContainer">
				{props.isSalePricing ? (
					<>
						<span className="tableRowCompactPriceText tableRowCompactDisabledTableText tableRowCompactSalePriceTextSmall">
							{props.item.formattedOriginalPrice()}
						</span>
						<span className="tableRowCompactPriceText">
							{props.item.formattedPrice()}
						</span>
					</>
				) : (
					<span className="tableRowCompactPriceText">
						{props.item.formattedOriginalPrice() ?? props.item.formattedPrice()}
					</span>
				)}
			</td>
		</tr>
	);
}
