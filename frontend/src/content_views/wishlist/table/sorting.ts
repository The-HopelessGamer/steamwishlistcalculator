import { WishlistItem } from "../../../wishlist_item";

type SortingFunction = (
	wishlist: WishlistItem[],
	reverse: boolean
) => WishlistItem[];

export const sortingFunctions = {
	sortByTitle,
	sortByDate,
	sortByAppid,
	sortByPrice,
	sortBySale,
	sortByPreOrder,
	sortByPriority,
} satisfies Record<string, SortingFunction>;

function sortByTitle(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		if (a.isUnlisted() && !b.isUnlisted()) {
			return 1 * reverseScale;
		}
		if (!a.isUnlisted() && b.isUnlisted()) {
			return -1 * reverseScale;
		}
		if (a.isUnlisted() && b.isUnlisted()) {
			return 0;
		}

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

function sortByDate(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aReleaseDate = a.releaseDate();
		const bReleaseDate = b.releaseDate();

		if (aReleaseDate && bReleaseDate) {
			return (aReleaseDate.getTime() - bReleaseDate.getTime()) * reverseScale;
		}

		if (a.isComingSoon() && !b.isComingSoon()) {
			return 1 * reverseScale;
		}
		if (!a.isComingSoon() && b.isComingSoon()) {
			return -1 * reverseScale;
		}
		if (a.isComingSoon() && b.isComingSoon()) {
			return 0;
		}

		if (!aReleaseDate && !a.isComingSoon() && bReleaseDate) {
			return 1 * reverseScale;
		}
		if (aReleaseDate && !bReleaseDate && !b.isComingSoon()) {
			return -1 * reverseScale;
		}

		return 0;
	});
}
function sortByAppid(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
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

		return (aAppid - bAppid) * reverseScale;
	});
}

function sortByPrice(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aPrice = a.price();
		const bPrice = b.price();

		if (aPrice !== undefined && bPrice !== undefined) {
			return (bPrice - aPrice) * reverseScale;
		}

		if (a.isFree() && !b.isFree()) {
			if (bPrice !== undefined) {
				return 1 * reverseScale;
			}
			return -1 * reverseScale;
		}
		if (!a.isFree() && b.isFree()) {
			if (aPrice !== undefined) {
				return -1 * reverseScale;
			}
			return 1 * reverseScale;
		}
		if (a.isFree() && b.isFree()) {
			return 0;
		}

		if (!aPrice && !a.isFree() && (bPrice || b.isFree())) {
			return 1 * reverseScale;
		}
		if ((aPrice || a.isFree()) && !bPrice && !b.isFree()) {
			return -1 * reverseScale;
		}

		return 0;
	});
}

function sortBySale(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aSale = a.onSale();
		const bSale = b.onSale();

		if (!aSale && !bSale) {
			return 0;
		}

		if (aSale && !bSale) {
			return -1 * reverseScale;
		}
		if (!aSale && bSale) {
			return 1 * reverseScale;
		}

		const aDiscount = a.discountPercentage() ?? 0;
		const bDiscount = b.discountPercentage() ?? 0;
		return (bDiscount - aDiscount) * reverseScale;
	});
}

function sortByPreOrder(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aPreOrder = a.isPreOrder();
		const bPreOrder = b.isPreOrder();

		if (aPreOrder && !bPreOrder) {
			return 1 * reverseScale;
		}

		if (bPreOrder && !aPreOrder) {
			return -1 * reverseScale;
		}

		return 0;
	});
}

function sortByPriority(
	wishlist: WishlistItem[],
	reverse: boolean
): WishlistItem[] {
	const reverseScale = reverse ? -1 : 1;

	return wishlist.sort((a, b) => {
		const aPriority = a.priority;
		const bPriority = b.priority;

		if (aPriority === bPriority) {
			return 0;
		}

		if (aPriority === undefined) {
			return 1 * reverseScale;
		}

		if (bPriority === undefined) {
			return -1 * reverseScale;
		}

		return (aPriority - bPriority) * reverseScale;
	});
}
