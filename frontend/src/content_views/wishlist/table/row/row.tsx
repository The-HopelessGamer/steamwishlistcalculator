import { classNames } from "../../../../utils";
import { WishlistItem } from "../../../../wishlist_item";
import "./row.css";

type RowProps = {
	item: WishlistItem;
	isSalePricing: boolean;
};

export function Row(props: RowProps) {
	return (
		<tr className="tableRow">
			<td>
				<a
					href={props.item.link()}
					className="tableRowTitleContainer"
					title={props.item.formattedTitle()}
					target="_blank"
				>
					{props.item.formattedTitle()}
				</a>
			</td>
			<td className="tableRowPropertyContainer">
				{props.item.formattedReleaseDate()}
			</td>
			<td className="tableRowPropertyContainer">
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
			<td className="tableRowPropertyContainer">
				{props.item.isPreOrder() ? "Yes" : "No"}
			</td>
			<td className="tableRowPropertyContainer">
				{props.isSalePricing ? (
					<>
						<span className="tableRowPriceText tableRowDisabledTableText tableRowSalePriceTextSmall">
							{props.item.formattedOriginalPrice()}
						</span>
						<span className="tableRowPriceText">
							{props.item.formattedPrice()}
						</span>
					</>
				) : (
					<span className="tableRowPriceText">
						{props.item.formattedOriginalPrice() ?? props.item.formattedPrice()}
					</span>
				)}
			</td>
		</tr>
	);
}
