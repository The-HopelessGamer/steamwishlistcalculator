import type { StoreItem } from "protos/dist/common";

const STEAM_STORE_BASE_URL = "https://store.steampowered.com/app/";
const STEAM_DB_BASE_URL = "https://steamdb.info/app/";

export class WishlistItem {
	private readonly storeItem: StoreItem;
	readonly priority: number | undefined;

	constructor(storeItem: StoreItem, priority: number | undefined) {
		if (storeItem.appid === undefined) {
			throw new Error("Undefined AppID");
		}

		this.storeItem = storeItem;
		this.priority = priority;
	}

	link() {
		if (this.isUnlisted()) {
			return STEAM_DB_BASE_URL + this.appid();
		}

		return STEAM_STORE_BASE_URL + this.appid();
	}

	formattedTitle() {
		if (this.isUnlisted() || this.storeItem.name === undefined) {
			return "Game Unlisted On Steam";
		}

		return this.storeItem.name;
	}

	title() {
		return this.storeItem.name;
	}

	formattedReleaseDate() {
		const releaseDate = this.releaseDate();

		if (releaseDate === undefined) {
			return this.storeItem.isComingSoon ? "Coming Soon" : "Date Unknown";
		}

		return releaseDate.toLocaleDateString();
	}

	releaseDate() {
		const mostRecentReleaseDate = Math.max(
			this.storeItem.release?.steamReleaseDate ?? 0,
			this.storeItem.release?.originalSteamReleaseDate ?? 0,
			this.storeItem.release?.originalReleaseDate ?? 0
		);

		return mostRecentReleaseDate > 0 && !this.storeItem.isComingSoon
			? new Date(mostRecentReleaseDate * 1000)
			: undefined;
	}

	appid() {
		return this.storeItem.appid as number;
	}

	onSale() {
		return this.storeItem.bestPurchaseOption?.activeDiscounts !== undefined;
	}

	discountPercentage() {
		return this.storeItem.bestPurchaseOption?.discountPct ?? 0;
	}

	formattedPrice() {
		if (this.storeItem.isFree) {
			return "Free";
		}

		return this.storeItem.bestPurchaseOption?.formattedFinalPrice ?? "N/A";
	}

	formattedOriginalPrice() {
		return this.storeItem.bestPurchaseOption?.formattedOriginalPrice;
	}

	price() {
		return this.storeItem.bestPurchaseOption?.finalPriceInCents;
	}

	originalPrice() {
		return this.storeItem.bestPurchaseOption?.originalPriceInCents;
	}

	isFree() {
		return this.storeItem.isFree ?? false;
	}

	isPreOrder() {
		return !!(
			this.storeItem.bestPurchaseOption?.formattedFinalPrice &&
			this.storeItem.isComingSoon
		);
	}

	isUnlisted() {
		return !(this.storeItem.visible ?? false);
	}

	isComingSoon() {
		return this.storeItem.isComingSoon ?? false;
	}
}
