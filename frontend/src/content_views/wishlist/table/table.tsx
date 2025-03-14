import { ContentBox } from "../../../design_system/content_box/content_box";
import "./table.css";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";
import {
	sortedByTitle,
	sortedByDate,
	sortedByAppid,
	sortedByPrice,
} from "./sorting/sorting";
import { WishlistItem } from "../../../wishlist_item";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: WishlistItem[];
};

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

function TableRowHeader() {
	return (
		<thead>
			<tr>
				<th>Title</th>
				<th>Release Date</th>
				<th>AppID</th>
				<th>On Sale</th>
				<th>Pre Order</th>
				<th>Price</th>
			</tr>
		</thead>
	);
}

export function Table({ profileName, steamId, wishlist }: TableProps) {
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
				<TableRowHeader />
				<tbody>
					{sortedByPrice(wishlist, true).map((item) => {
						return <TableRow key={String(item.appid())} item={item} />;
					})}
				</tbody>
			</table>
		</ContentBox>
	);
}
