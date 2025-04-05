import "./table.css";
import { ContentBox } from "../../../design_system/content_box/content_box";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { Stats } from "./stats/stats";
import { sortingFunctions } from "./sorting";
import { WishlistItem } from "../../../wishlist_item";
import { useState } from "react";
import { Row } from "./row/row";
import { SortButton } from "./sort_button/sort_button";
import { RowCompact } from "./row_compact/row_compact";
import { useMediaQuery } from "../../../utils";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

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

	const isLargeScreen = useMediaQuery("(min-width: 750px)");

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
							disabled={props.wishlist.every((item) => !item.onSale())}
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
				<Stats wishlist={props.wishlist} isSalePricing={isSalePricing} />
				<div className="tableDivider" />
				<table className="table">
					<thead className="tableHeaderSortingContainer">
						<tr>
							<th className="tableTitleSortButton tableHeaderSortButton">
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
							if (isLargeScreen) {
								return (
									<Row
										key={item.appid()}
										item={item}
										isSalePricing={isSalePricing}
									/>
								);
							} else {
								return (
									<RowCompact
										key={item.appid()}
										item={item}
										isSalePricing={isSalePricing}
									/>
								);
							}
						})}
					</tbody>
				</table>
			</ContentBox>
		</div>
	);
}
