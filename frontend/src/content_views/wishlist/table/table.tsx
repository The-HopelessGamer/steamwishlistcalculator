import { ContentBox } from "../../../design_system/content_box/content_box";
import "./table.css";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";
import type { common } from "protos";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: common.StoreItem[];
};

type TableRowProps = {
	item: common.StoreItem;
};

function getPrice(
	formattedPrice: string | undefined,
	formattedOriginalPrice: string | undefined,
	isFree: boolean | undefined
): string {
	if (isFree) {
		return "Free";
	}

	if (formattedPrice) {
		return formattedPrice;
	}

	return "N/A";
}

function TableRow({ item }: TableRowProps) {
	const formattedPrice = item.bestPurchaseOption?.formattedFinalPrice;
	const formattedOriginalPrice =
		item.bestPurchaseOption?.formattedOriginalPrice;
	const releaseDate = item.release?.originalReleaseDate
		? new Date(item.release?.originalReleaseDate * 1000).toLocaleDateString()
		: undefined;
	const isPreOrder = !!(formattedPrice && item.isComingSoon);

	return (
		<tr>
			<td>{item.name ?? "Game Unlisted on Steam"}</td>
			<td>
				{releaseDate ?? (item.isComingSoon ? "Coming Soon" : "Date Unknown")}
			</td>
			<td>{String(item.appid)}</td>
			<td>{item.bestPurchaseOption?.activeDiscounts ? "Yes" : "No"}</td>
			<td>{isPreOrder ? "Yes" : "No"}</td>
			<td>{getPrice(formattedPrice, formattedOriginalPrice, item.isFree)}</td>
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
					{wishlist.map((item) => {
						if (item.appid === undefined) {
							throw new Error("no appid");
						}
						return <TableRow key={String(item.appid)} item={item} />;
					})}
				</tbody>
			</table>
		</ContentBox>
	);
}
