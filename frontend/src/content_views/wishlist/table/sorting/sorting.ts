import { WishlistItem } from "../../../../wishlist_item";


export function sortedByTitle(wishlist: WishlistItem[], reverse: boolean): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aTitle = a.title();
		const bTitle = b.title();

		if (aTitle === bTitle) {
			return 0;
		}
		
		if (aTitle === undefined) {
			return 1 * reverseScale;
		}

		if (bTitle === undefined) {
			return -1 * reverseScale;
		}

		return aTitle.localeCompare(bTitle) * reverseScale;
	});
}

export function sortedByDate(wishlist: WishlistItem[], reverse: boolean): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aReleaseDate = a.releaseDate();
		const bReleaseDate = b.releaseDate();

		// If both items have actual release dates, compare them
		if (aReleaseDate && bReleaseDate) {
			return (aReleaseDate.getTime() - bReleaseDate.getTime()) * reverseScale;
		}

		// Handle Coming Soon items
		if (a.isComingSoon() && !b.isComingSoon()) {
			return 1 * reverseScale; // Coming Soon appears after released dates
		}
		if (!a.isComingSoon() && b.isComingSoon()) {
			return -1 * reverseScale;
		}
		if (a.isComingSoon() && b.isComingSoon()) {
			return 0; // Both Coming Soon, keep original order
		}

		// Handle Date Unknown items (no release date and not Coming Soon)
		if (!aReleaseDate && !a.isComingSoon() && bReleaseDate) {
			return 1 * reverseScale; // Unknown dates appear last
		}
		if (aReleaseDate && !bReleaseDate && !b.isComingSoon()) {
			return -1 * reverseScale;
		}

		return 0; // Both unknown dates, keep original order
	});
}

export function sortedByAppid(wishlist: WishlistItem[], reverse: boolean): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aAppid = a.appid();
		const bAppid = b.appid();

		if (aAppid === bAppid) {
			return 0;
		}
		
		if (aAppid === undefined) {
			return 1 * reverseScale;
		}

		if (bAppid === undefined) {
			return -1 * reverseScale;
		}

		return aAppid - bAppid * reverseScale;
	});
}

export function sortedByPrice(wishlist: WishlistItem[], reverse: boolean): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aPrice = a.price();
		const bPrice = b.price();

		// Handle N/A prices (undefined prices and not free)
		if (!aPrice && !a.isFree() && (bPrice || b.isFree())) {
			return 1 * reverseScale; // N/A appears last
		}
		if ((aPrice || a.isFree()) && !bPrice && !b.isFree()) {
			return -1 * reverseScale;
		}

		// Handle Free items
		if (a.isFree() && !b.isFree() && bPrice !== undefined) {
			return 1 * reverseScale; // Free appears after priced items
		}
		if (!a.isFree() && b.isFree() && aPrice !== undefined) {
			return -1 * reverseScale;
		}
		if (a.isFree() && b.isFree()) {
			return 0; // Both free, keep original order
		}

		// If both items have prices, compare them
		if (aPrice !== undefined && bPrice !== undefined) {
			return (aPrice - bPrice) * reverseScale;
		}

		return 0; // Both N/A, keep original order
	});
}