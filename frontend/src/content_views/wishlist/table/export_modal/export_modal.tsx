import "./export_modal.css";
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
	const isLargeScreen = useMediaQuery("(min-width: 750px)");
	const [exportMode, setExportMode] = useState<"title" | "appid">("title");
	const [filterFree, setFilterFree] = useState(false);
	const [filterOnSale, setFilterOnSale] = useState(false);
	const [filterPreOrder, setFilterPreOrder] = useState(false);
	const [filterUnlisted, setFilterUnlisted] = useState(false);

	const exportOutput = props.wishlist
		.filter((wishlistItem) => !filterFree || wishlistItem.isFree())
		.filter((wishlistItem) => !filterOnSale || wishlistItem.onSale())
		.filter((wishlistItem) => !filterPreOrder || wishlistItem.isPreOrder())
		.filter((wishlistItem) => !filterUnlisted || wishlistItem.isUnlisted())
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
			<div className="exportOptionsContainer">
				<Switch on={filterFree} onChange={(value) => setFilterFree(value)}>
					Free
				</Switch>
			</div>
			<div className="exportOptionsContainer">
				<Switch on={filterOnSale} onChange={(value) => setFilterOnSale(value)}>
					On Sale
				</Switch>
			</div>
			<div className="exportOptionsContainer">
				<Switch
					on={filterPreOrder}
					onChange={(value) => setFilterPreOrder(value)}
				>
					Pre Order
				</Switch>
			</div>
			<div className="exportOptionsContainer">
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
					<div className="exportRow">
						<div className="exportControlGroup">
							Mode:
							<div className="exportModesContainer">{exportModes}</div>
						</div>
						<div className="exportModeDivider" />
						<div className="exportControlGroup">
							Filter:
							<div className="exportFiltersContainer">
								{exportFilterOptions}
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="exportRowCompact">
						<div className="exportControlGroup">
							Mode:
							<div className="exportModesCompact">{exportModes}</div>
						</div>
						<div className="exportModeDividerCompact" />
						<div className="exportControlGroup">
							Filter:
							<div className="exportFiltersCompact">{exportFilterOptions}</div>
						</div>
					</div>
				</>
			)}
			<textarea className="exportData" readOnly value={exportOutput} />
		</Modal>
	);
}
