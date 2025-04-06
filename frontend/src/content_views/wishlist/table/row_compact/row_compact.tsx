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
				<div className="tableRowCompactLabel">Title</div>
				<a
					href={props.item.link()}
					className="tableRowCompactTitleContainer"
					title={props.item.formattedTitle()}
					target="_blank"
				>
					{props.item.formattedTitle()}
				</a>
			</td>
			<td>
				<div className="tableRowCompactLabel">Release Date</div>
				<div className="tableRowCompactValue">
					{props.item.formattedReleaseDate()}
				</div>
			</td>
			<td>
				<div className="tableRowCompactLabel">AppID</div>
				<div className="tableRowCompactValue">{String(props.item.appid())}</div>
			</td>
			<td>
				<div className="tableRowCompactLabel">On Sale</div>
				<div
					className={classNames([
						"tableRowCompactValue",
						!props.isSalePricing &&
							props.item.onSale() &&
							"tableRowDisabledTableText",
					])}
				>
					{props.item.onSale() ? `${props.item.discountPercentage()}%` : "No"}
				</div>
			</td>
			<td>
				<div className="tableRowCompactLabel">Pre Order</div>
				<div className="tableRowCompactValue">
					{props.item.isPreOrder() ? "Yes" : "No"}
				</div>
			</td>
			<td>
				<div className="tableRowCompactLabel">Price</div>
				<div className="tableRowCompactPriceContainer">
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
							{props.item.formattedOriginalPrice() ??
								props.item.formattedPrice()}
						</span>
					)}
				</div>
			</td>
		</tr>
	);
}
