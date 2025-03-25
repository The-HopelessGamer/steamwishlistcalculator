import "./table.css";
import { ContentBox } from "../../../design_system/content_box/content_box";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";
import { sortingFunctions } from "./sorting";
import { WishlistItem } from "../../../wishlist_item";
import { useState } from "react";
import { BaseButton } from "../../../design_system/base_button/base_button";
import CaretIcon from "./icons/caret-down-solid.svg?react";
import { classNames } from "../../../utils";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableRowProps = {
	item: WishlistItem;
};

function TableRow({ item }: TableRowProps) {
	return (
		<tr>
			<td>
				<a href={item.link()} target="_blank">
					{item.formattedTitle()}
				</a>
			</td>
			<td className="tableRowPropertyContainer">
				{item.formattedReleaseDate()}
			</td>
			<td className="tableRowPropertyContainer">{String(item.appid())}</td>
			<td className="tableRowPropertyContainer">
				{item.onSale() ? "Yes" : "No"}
			</td>
			<td className="tableRowPropertyContainer">
				{item.isPreOrder() ? "Yes" : "No"}
			</td>
			<td className="tableRowPropertyContainer">
				{item.formattedPrice()} {item.formattedOriginalPrice()}
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
			className={classNames(["sortButton", !isActive && "sortButtonInactive"])}
			onClick={() => props.onClick(props.sortKey)}
		>
			{props.text}
			<CaretIcon
				className={classNames([
					"sortButtonIcon",
					props.isReversed && isActive && "sortButtonReversed",
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

	const handleSort = (key: keyof typeof sortingFunctions) => {
		if (key === sortingFunctionKey) {
			setIsReversed(!isReversed);
		} else {
			setSortingFunctionKey(key);
			setIsReversed(false);
		}
	};

	return (
		<ContentBox color="white">
			<div className="tableHeader">
				<div className="tableHeaderButton">
					<PrimaryButton text="Disable Sale Pricing" />
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
			<WishlistStats wishlist={props.wishlist} />
			<div className="tableDivider" />
			<table>
				<thead>
					<tr>
						<th className="titleContainer">
							<SortButton
								text="Title"
								sortKey="sortByTitle"
								onClick={handleSort}
								currentSortKey={sortingFunctionKey}
								isReversed={isReversed}
							/>
						</th>
						<th>
							<SortButton
								text="Release Date"
								sortKey="sortByDate"
								onClick={handleSort}
								currentSortKey={sortingFunctionKey}
								isReversed={isReversed}
							/>
						</th>
						<th>
							<SortButton
								text="AppID"
								sortKey="sortByAppid"
								onClick={handleSort}
								currentSortKey={sortingFunctionKey}
								isReversed={isReversed}
							/>
						</th>
						<th>
							<SortButton
								text="On Sale"
								sortKey="sortBySale"
								onClick={handleSort}
								currentSortKey={sortingFunctionKey}
								isReversed={isReversed}
							/>
						</th>
						<th>
							<SortButton
								text="Pre Order"
								sortKey="sortByPreOrder"
								onClick={handleSort}
								currentSortKey={sortingFunctionKey}
								isReversed={isReversed}
							/>
						</th>
						<th>
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
					{sortingFunctions[sortingFunctionKey](props.wishlist, isReversed).map(
						(item) => {
							return <TableRow key={String(item.appid())} item={item} />;
						}
					)}
				</tbody>
			</table>
		</ContentBox>
	);
}
