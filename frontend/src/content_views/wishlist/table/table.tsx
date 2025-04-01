import "./table.css";
import CaretIcon from "./icons/caret-down-solid.svg?react";
import { ContentBox } from "../../../design_system/content_box/content_box";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";
import { sortingFunctions } from "./sorting";
import { WishlistItem } from "../../../wishlist_item";
import { useState } from "react";
import { BaseButton } from "../../../design_system/base_button/base_button";
import { classNames } from "../../../utils";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableRowProps = {
	item: WishlistItem;
	isSalePricing: boolean;
};

function TableRow(props: TableRowProps) {
	return (
		<tr className="tableRow">
			<td>
				<a
					href={props.item.link()}
					className="tableRowTitleContainer"
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
						"wishlistDisabledTableText",
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
						<span className="tableRowPriceText wishlistDisabledTableText tableRowSalePriceTextSmall">
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

type SortButtonProps = {
	text: string;
	sortKey: keyof typeof sortingFunctions;
	onClick: (key: keyof typeof sortingFunctions) => void;
	currentSortKey: keyof typeof sortingFunctions;
	isReversed: boolean;
};

function SortButton(props: SortButtonProps) {
	const isActive = props.sortKey === props.currentSortKey;

	return (
		<BaseButton
			className={classNames([
				"tableHeaderSortButtonActive",
				!isActive && "tableHeaderSortButtonInactive",
			])}
			onClick={() => props.onClick(props.sortKey)}
		>
			{props.text}
			<CaretIcon
				className={classNames([
					"tableHeaderSortButtonIcon",
					props.isReversed && isActive && "tableHeaderSortButtonReversed",
				])}
			/>
		</BaseButton>
	);
}

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: WishlistItem[];
};

export function Table(props: TableProps) {
	const [sortingFunctionKey, setSortingFunctionKey] =
		useState<keyof typeof sortingFunctions>("sortByTitle");
	const [isReversed, setIsReversed] = useState(false);
	const [isSalePricing, setSalePricing] = useState(true);

	const handleSort = (key: keyof typeof sortingFunctions) => {
		if (key === sortingFunctionKey) {
			setIsReversed(!isReversed);
		} else {
			setSortingFunctionKey(key);
			setIsReversed(false);
		}
	};

	return (
		<div className="tableContainer">
			<ContentBox color="white">
				<div className="tableHeader">
					<div className="tableHeaderButton">
						<PrimaryButton
							onClick={() => setSalePricing(!isSalePricing)}
							text={
								isSalePricing ? "Disable Sale Pricing" : "Enable Sale Pricing"
							}
						/>
					</div>
					<div className="tableHeaderProfileLinkContainer">
						<a
							href={STEAM_PROFILE_BASE_URL + props.steamId}
							className="tableHeaderProfileLink"
						>
							{props.profileName}
						</a>
					</div>

					<div className="tableHeaderButton">
						<PrimaryButton text="Export Wishlist" />
					</div>
				</div>
				<WishlistStats
					wishlist={props.wishlist}
					isSalePricing={isSalePricing}
				/>
				<div className="tableDivider" />
				<table className="wishlistTable">
					<thead className="tableHeaderSortingContainer">
						<tr>
							<th className="tableTitleContainer tableHeaderSortButton">
								<SortButton
									text="Title"
									sortKey="sortByTitle"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
							<th className="tableHeaderSortButton">
								<SortButton
									text="Release Date"
									sortKey="sortByDate"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
							<th className="tableHeaderSortButton">
								<SortButton
									text="AppID"
									sortKey="sortByAppid"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
							<th className="tableHeaderSortButton">
								<SortButton
									text="On Sale"
									sortKey="sortBySale"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
							<th className="tableHeaderSortButton">
								<SortButton
									text="Pre Order"
									sortKey="sortByPreOrder"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
							<th className="tableHeaderSortButton">
								<SortButton
									text="Price"
									sortKey="sortByPrice"
									onClick={handleSort}
									currentSortKey={sortingFunctionKey}
									isReversed={isReversed}
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{sortingFunctions[sortingFunctionKey](
							props.wishlist,
							isReversed
						).map((item) => {
							return (
								<TableRow
									key={item.appid()}
									item={item}
									isSalePricing={isSalePricing}
								/>
							);
						})}
					</tbody>
				</table>
			</ContentBox>
		</div>
	);
}
