import { ContentBox } from "../../../design_system/content_box/content_box";
import "./table.css";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { WishlistStats } from "./wishlist_stats/wishlist_stats";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: StoreItem[];
};

interface StoreItem {
	itemType?: number | undefined;
	id?: number | undefined;
	success?: number | undefined;
	visible?: boolean | undefined;
	unvailableForCountryRestriction?: boolean | undefined;
	name?: string | undefined;
	storeUrlPath?: string | undefined;
	appid?: number | undefined;
	type?: number | undefined;
	includedTypes: number[];
	includedAppids: number[];
	isFree?: boolean | undefined;
	isEarlyAccess?: boolean | undefined;
	// relatedItems?: StoreItemRelatedItems | undefined;
	// includedItems?: StoreItemIncludedItems | undefined;
	contentDescriptorids: number[];
	tagids: number[];
	// categories?: StoreItemCategories | undefined;
	// reviews?: StoreItemReviews | undefined;
	// basicInfo?: StoreItemBasicInfo | undefined;
	// tags: StoreItemTag[];
	// assets?: StoreItemAssets | undefined;
	release?: StoreItemReleaseInfo | undefined;
	// platforms?: StoreItemPlatforms | undefined;
	// gameRating?: StoreGameRating | undefined;
	isComingSoon?: boolean | undefined;
	// bestPurchaseOption?: StoreItemPurchaseOption | undefined;
	// purchaseOptions: StoreItemPurchaseOption[];
	// accessories: StoreItemPurchaseOption[];
	// selfPurchaseOption?: StoreItemPurchaseOption | undefined;
	// screenshots?: StoreItemScreenshots | undefined;
	// trailers?: StoreItemTrailers | undefined;
	// supportedLanguages: StoreItemSupportedLanguage[];
	storeUrlPathOverride?: string | undefined;
	// freeWeekend?: StoreItemFreeWeekend | undefined;
	unlisted?: boolean | undefined;
	gameCount?: number | undefined;
	internalName?: string | undefined;
	fullDescription?: string | undefined;
	isFreeTemporarily?: boolean | undefined;
	// assetsWithoutOverrides?: StoreItemAssets | undefined;
	// userFilterFailure?: StoreBrowseFilterFailure | undefined;
	// links: StoreItemLink[];
}

interface StoreItemReleaseInfo {
	steamReleaseDate?: number | undefined;
	originalReleaseDate?: number | undefined;
	originalSteamReleaseDate?: number | undefined;
	isComingSoon?: boolean | undefined;
	isPreload?: boolean | undefined;
	customReleaseDateMessage?: string | undefined;
	isAbridgedReleaseDate?: boolean | undefined;
	comingSoonDisplay?: string | undefined;
	isEarlyAccess?: boolean | undefined;
	macReleaseDate?: number | undefined;
	linuxReleaseDate?: number | undefined;
}

type TableRowProps = {
	key: string;
	title: string;
	releaseDate: Date | undefined;
	appId: string;
	onSale: boolean;
	preOrder: boolean;
	price: number;
};

function TableRow({
	title,
	releaseDate,
	appId,
	onSale,
	preOrder,
	price,
}: TableRowProps) {
	return (
		<tr>
			<td>{title}</td>
			<td>{releaseDate ? releaseDate.toLocaleDateString() : "Coming Soon"}</td>
			<td>{appId}</td>
			<td>{onSale}</td>
			<td>{preOrder}</td>
			<td>{price}</td>
		</tr>
	);
}

function TableRowHeader() {
	return (
		<tr>
			<th>Title</th>
			<th>Release Date</th>
			<th>AppID</th>
			<th>On Sale</th>
			<th>Pre Order</th>
			<th>Price</th>
		</tr>
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
				{wishlist.map((item) => {
					if (item.appid === undefined) {
						throw new Error("no appid");
					}
					return (
						<TableRow
							key={String(item.appid)}
							title={item.name || "Game Unlisted on Steam"}
							releaseDate={
								item.release?.originalReleaseDate
									? new Date(item.release?.originalReleaseDate * 1000)
									: undefined
							}
							appId={String(item.appid)}
							onSale={item}
							preOrder={false}
							price={0}
						/>
					);
				})}
			</table>

			<p>{JSON.stringify(wishlist)}</p>
		</ContentBox>
	);
}
