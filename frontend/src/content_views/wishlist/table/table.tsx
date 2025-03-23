import { ContentBox } from "../../../design_system/content_box/content_box";
import "./table.css";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";
import { sortingFunctions } from "./sorting";
import { WishlistItem } from "../../../wishlist_item";
import { useState } from "react";

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
			<td>{item.formattedReleaseDate()}</td>
			<td>{String(item.appid())}</td>
			<td>{item.onSale() ? "Yes" : "No"}</td>
			<td>{item.isPreOrder() ? "Yes" : "No"}</td>
			<td>
				{item.formattedPrice()} {item.formattedOriginalPrice()}
			</td>
		</tr>
	);
}

type SortButtonProps = {
	text: string;
	sortKey: keyof typeof sortingFunctions;
	onClick: (key: keyof typeof sortingFunctions) => void;
};

function SortButton({ text, sortKey, onClick }: SortButtonProps) {
	return (
		<button onClick={() => onClick(sortKey)}>
			{text}
			<span>▼</span>
		</button>
	);
}

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: WishlistItem[];
};

export function Table({ profileName, steamId, wishlist }: TableProps) {
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
						href={STEAM_PROFILE_BASE_URL + steamId}
						className="tableHeaderProfileLink"
					>
						{profileName}
					</a>
				</div>

				<div className="tableHeaderButton">
					<PrimaryButton text="Export Wishlist" />
				</div>
			</div>
			<WishlistStats wishlist={wishlist} />
			<div className="tableDivider" />
			<table>
				<thead>
					<tr>
						<th>
							<SortButton
								text="Title"
								sortKey="sortByTitle"
								onClick={handleSort}
							/>
						</th>
						<th>
							<SortButton
								text="Release Date"
								sortKey="sortByDate"
								onClick={handleSort}
							/>
						</th>
						<th>
							<SortButton
								text="AppID"
								sortKey="sortByAppid"
								onClick={handleSort}
							/>
						</th>
						<th>
							<SortButton
								text="On Sale"
								sortKey="sortBySale"
								onClick={handleSort}
							/>
						</th>
						<th>
							<SortButton
								text="Pre Order"
								sortKey="sortByPreOrder"
								onClick={handleSort}
							/>
						</th>
						<th>
							<SortButton
								text="Price"
								sortKey="sortByPrice"
								onClick={handleSort}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{sortingFunctions[sortingFunctionKey](wishlist, isReversed).map(
						(item) => {
							return <TableRow key={String(item.appid())} item={item} />;
						}
					)}
				</tbody>
			</table>
		</ContentBox>
	);
}
