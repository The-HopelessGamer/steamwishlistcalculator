import styles from "./table.module.css";
import { ContentBox } from "../../../design_system/content_box/content_box";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import { Stats } from "./stats/stats";
import { StatsCompact } from "./stats_compact/stats_compact";
import { sortingFunctions } from "./sorting";
import { WishlistItem } from "../../../wishlist_item";
import { useRef, useState } from "react";
import { Row } from "./row/row";
import { SortButton } from "./sort_button/sort_button";
import { RowCompact } from "./row_compact/row_compact";
import { useMediaQuery } from "../../../utils";
import { ExportModal } from "./export_modal/export_modal";

const STEAM_PROFILE_BASE_URL =
	"https://store.steampowered.com/wishlist/profiles/";

type TableProps = {
	profileName: string;
	steamId: string;
	wishlist: WishlistItem[];
	setIsAppScrollable: (value: boolean) => void;
	countryCode: string;
};

export function Table(props: TableProps) {
	const [sortingFunctionKey, setSortingFunctionKey] =
		useState<keyof typeof sortingFunctions>("sortByPriority");
	const [isReversed, setIsReversed] = useState(false);
	const [isSalePricing, setSalePricing] = useState(true);
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const isLargeScreen = useMediaQuery("(min-width: 850px)");

	const handleSort = (key: keyof typeof sortingFunctions) => {
		if (key === sortingFunctionKey) {
			setIsReversed(!isReversed);
		} else {
			setSortingFunctionKey(key);
			setIsReversed(false);
		}
	};

	const profileHeader = (
		<div className={styles.tableHeaderProfileLinkContainer}>
			<a
				href={STEAM_PROFILE_BASE_URL + props.steamId}
				className={styles.tableHeaderProfileLink}
				target="_blank"
			>
				{props.profileName}
			</a>
		</div>
	);

	const toggleSalePricingButton = (
		<PrimaryButton
			onClick={() => setSalePricing(!isSalePricing)}
			text={isSalePricing ? "Disable Sale Pricing" : "Enable Sale Pricing"}
			disabled={props.wishlist.every((item) => !item.onSale())}
		/>
	);

	const openModal = () => {
		dialogRef.current?.showModal();
		props.setIsAppScrollable(false);
	};

	const closeModal = () => {
		dialogRef.current?.close();
		props.setIsAppScrollable(true);
	};

	const exportButton = (
		<PrimaryButton text="Export Wishlist" onClick={openModal} />
	);

	return (
		<div className={styles.tableContainer}>
			<ExportModal
				dialogRef={dialogRef}
				closeModal={closeModal}
				wishlist={props.wishlist}
			/>
			<ContentBox color="white">
				{isLargeScreen ? (
					<div className={styles.tableHeaderProfileContainer}>
						<div>{toggleSalePricingButton}</div>
						{profileHeader}
						<div>{exportButton}</div>
					</div>
				) : (
					<div className={styles.tableHeaderCompactProfileContainer}>
						{profileHeader}
						<div className={styles.tableHeaderCompactProfileButton}>
							{toggleSalePricingButton}
						</div>
						<div className={styles.tableHeaderCompactProfileButton}>
							{exportButton}
						</div>
					</div>
				)}
				{isLargeScreen ? (
					<>
						<Stats
							wishlist={props.wishlist}
							isSalePricing={isSalePricing}
							countryCode={props.countryCode}
						/>
						<div className={styles.tableHeaderDivider} />
					</>
				) : (
					<>
						<StatsCompact
							wishlist={props.wishlist}
							isSalePricing={isSalePricing}
							countryCode={props.countryCode}
						/>
						<span className={styles.tableHeaderCompactDivider}>
							Wishlist Items
						</span>
					</>
				)}
				<table className={styles.table}>
					{isLargeScreen && (
						<thead className={styles.tableHeaderSortingContainer}>
							<tr>
								<th className={styles.tableHeaderSortButton}>
									<SortButton
										text="Priority"
										sortKey="sortByPriority"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={`${styles.tableTitleSortButton} ${styles.tableHeaderSortButton}`}>
									<SortButton
										text="Title"
										sortKey="sortByTitle"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={styles.tableHeaderSortButton}>
									<SortButton
										text="Release Date"
										sortKey="sortByDate"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={styles.tableHeaderSortButton}>
									<SortButton
										text="AppID"
										sortKey="sortByAppid"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={styles.tableHeaderSortButton}>
									<SortButton
										text="On Sale"
										sortKey="sortBySale"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={styles.tableHeaderSortButton}>
									<SortButton
										text="Pre Order"
										sortKey="sortByPreOrder"
										onClick={handleSort}
										currentSortKey={sortingFunctionKey}
										isReversed={isReversed}
									/>
								</th>
								<th className={styles.tableHeaderSortButton}>
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
					)}
					<tbody>
						{sortingFunctions[sortingFunctionKey](
							props.wishlist,
							isReversed
						).map((item) =>
							isLargeScreen ? (
								<Row
									key={item.appid()}
									item={item}
									isSalePricing={isSalePricing}
								/>
							) : (
								<RowCompact
									key={item.appid()}
									item={item}
									isSalePricing={isSalePricing}
								/>
							)
						)}
					</tbody>
				</table>
			</ContentBox>
		</div>
	);
}
