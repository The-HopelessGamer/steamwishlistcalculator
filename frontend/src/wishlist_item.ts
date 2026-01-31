import type { StoreItem } from "protos/common.js";

const STEAM_STORE_BASE_URL = "https://store.steampowered.com/app/";
const STEAM_DB_BASE_URL = "https://steamdb.info/app/";

export class WishlistItem {
	private readonly storeItem: StoreItem | undefined;
	readonly priority: number | undefined;
	readonly appid: number;

	constructor(storeItem: StoreItem | undefined, priority: number, appid: number) {

		this.storeItem = storeItem;
		this.priority = priority;
		this.appid = appid;
	}

	link() {
		if (this.isUnlisted()) {
			return STEAM_DB_BASE_URL + this.appid;
		}

		return STEAM_STORE_BASE_URL + this.appid;
	}

	formattedTitle() {
		if (this.isUnlisted() || this.storeItem?.name === undefined) {
			return "Game Unlisted On Steam";
		}

		return this.storeItem?.name;
	}

	title() {
		return this.storeItem?.name;
	}

	formattedReleaseDate() {
		const releaseDate = this.releaseDate();

		if (releaseDate === undefined) {
			return this.storeItem?.isComingSoon ? "Coming Soon" : "Date Unknown";
		}

		return releaseDate.toLocaleDateString();
	}

	releaseDate() {
		const mostRecentReleaseDate = Math.max(
			this.storeItem?.release?.steamReleaseDate ?? 0,
			this.storeItem?.release?.originalSteamReleaseDate ?? 0,
			this.storeItem?.release?.originalReleaseDate ?? 0
		);

		return mostRecentReleaseDate > 0 && !this.storeItem?.isComingSoon
			? new Date(mostRecentReleaseDate * 1000)
			: undefined;
	}

	onSale() {
		const activeDiscounts = this.storeItem?.bestPurchaseOption?.activeDiscounts;
		return activeDiscounts !== undefined && activeDiscounts.length > 0;
	}

	discountPercentage() {
		return this.storeItem?.bestPurchaseOption?.discountPct ?? 0;
	}

	formattedPrice() {
		if (this.storeItem?.isFree) {
			return "Free";
		}

		return this.storeItem?.bestPurchaseOption?.formattedFinalPrice ?? "N/A";
	}

	formattedOriginalPrice() {
		return this.storeItem?.bestPurchaseOption?.formattedOriginalPrice;
	}

	price() {
		return Number(this.storeItem?.bestPurchaseOption?.finalPriceInCents ?? 0);
	}

	originalPrice() {
		return this.storeItem?.bestPurchaseOption?.originalPriceInCents;
	}

	isFree() {
		return this.storeItem?.isFree ?? false;
	}

	isPreOrder() {
		return !!(
			this.storeItem?.bestPurchaseOption?.formattedFinalPrice &&
			this.storeItem?.isComingSoon
		);
	}

	isUnlisted() {
		return !(this.storeItem?.unlisted ?? true);
	}

	isComingSoon() {
		return this.storeItem?.isComingSoon ?? false;
	}
}
