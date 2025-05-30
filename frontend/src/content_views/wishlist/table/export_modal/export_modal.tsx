import styles from "./export_modal.module.css";
import { Modal } from "../../../../design_system/modal/modal";
import { WishlistItem } from "../../../../wishlist_item";
import { RefObject, useState } from "react";
import { Switch } from "../../../../design_system/switch/switch";
import { useMediaQuery } from "../../../../utils";

type ExportModalProps = {
	dialogRef: RefObject<HTMLDialogElement | null>;
	closeModal: () => void;
	wishlist: WishlistItem[];
};

export function ExportModal(props: ExportModalProps) {
	const isLargeScreen = useMediaQuery("(min-width: 850px)");
	const [exportMode, setExportMode] = useState<"title" | "appid">("title");
	const [filterFree, setFilterFree] = useState(false);
	const [filterOnSale, setFilterOnSale] = useState(false);
	const [filterPreOrder, setFilterPreOrder] = useState(false);
	const [filterUnlisted, setFilterUnlisted] = useState(false);

	const exportOutput = props.wishlist
		.filter((item) => {
			if (!filterFree && !filterOnSale && !filterPreOrder && !filterUnlisted) {
				return true;
			}
			return (
				(filterFree && item.isFree()) ||
				(filterOnSale && item.onSale()) ||
				(filterPreOrder && item.isPreOrder()) ||
				(filterUnlisted && item.isUnlisted())
			);
		})
		.map((wishlistItem) =>
			exportMode === "title"
				? wishlistItem.formattedTitle()
				: wishlistItem.appid().toString()
		)
		.join(", ");

	const exportModes = (
		<>
			<Switch
				on={exportMode === "title"}
				onChange={() => {
					setExportMode("title");
				}}
			>
				Titles
			</Switch>
			<Switch
				on={exportMode === "appid"}
				onChange={() => {
					setExportMode("appid");
				}}
			>
				Appids
			</Switch>
		</>
	);

	const exportFilterOptions = (
		<>
			<div className={styles.exportOptionsContainer}>
				<Switch on={filterFree} onChange={(value) => setFilterFree(value)}>
					Free
				</Switch>
			</div>
			<div className={styles.exportOptionsContainer}>
				<Switch on={filterOnSale} onChange={(value) => setFilterOnSale(value)}>
					On Sale
				</Switch>
			</div>
			<div className={styles.exportOptionsContainer}>
				<Switch
					on={filterPreOrder}
					onChange={(value) => setFilterPreOrder(value)}
				>
					Pre Order
				</Switch>
			</div>
			<div className={styles.exportOptionsContainer}>
				<Switch
					on={filterUnlisted}
					onChange={(value) => setFilterUnlisted(value)}
				>
					Unlisted
				</Switch>
			</div>
		</>
	);

	return (
		<Modal
			title="Export Wishlist"
			ref={props.dialogRef}
			onClickClose={props.closeModal}
		>
			{isLargeScreen ? (
				<>
					<div className={styles.exportRow}>
						<div className={styles.exportControlGroup}>
							Mode:
							<div className={styles.exportModesContainer}>{exportModes}</div>
						</div>
						<div className={styles.exportModeDivider} />
						<div className={styles.exportControlGroup}>
							Filter By:
							<div className={styles.exportFiltersContainer}>
								{exportFilterOptions}
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={styles.exportRowCompact}>
						<div className={styles.exportControlGroup}>
							Mode:
							<div className={styles.exportModesCompact}>{exportModes}</div>
						</div>
						<div className={styles.exportControlGroupCompact}>
							Filter By:
							<div className={styles.exportFiltersCompact}>
								{exportFilterOptions}
							</div>
						</div>
					</div>
				</>
			)}
			<textarea className={styles.exportData} readOnly value={exportOutput} />
		</Modal>
	);
}
