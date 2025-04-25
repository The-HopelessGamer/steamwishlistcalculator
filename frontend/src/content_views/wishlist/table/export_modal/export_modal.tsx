import "./export_modal.css";
import { Modal } from "../../../../design_system/modal/modal";
import { WishlistItem } from "../../../../wishlist_item";
import { RefObject } from "react";
import { Switch } from "../../../../design_system/switch/switch";

type ExportModalProps = {
	dialogRef: RefObject<HTMLDialogElement | null>;
	closeModal: () => void;
	wishlist: WishlistItem[];
	isLargeScreen: boolean;
};

export function ExportModal(props: ExportModalProps) {
	const exportModes = (
		<>
			<Switch on={true} onChange={false}>
				Titles
			</Switch>
			<Switch on={false} onChange={false}>
				Appids
			</Switch>
		</>
	);

	const exportFilterOptions = (
		<>
			<Switch on={true} onChange={true}>
				All
			</Switch>
			<Switch on={false} onChange={false}>
				Free
			</Switch>
			<Switch on={false} onChange={false}>
				On Sale
			</Switch>
			<Switch on={false} onChange={false}>
				Pre Order
			</Switch>
			<Switch on={false} onChange={false}>
				Unlisted
			</Switch>
		</>
	);

	return (
		<Modal
			title="Export Wishlist"
			ref={props.dialogRef}
			onClickClose={props.closeModal}
		>
			{props.isLargeScreen ? (
				<>
					<div className="exportRow">
						{exportModes}
						<div className="exportModeDivider" />
						{exportFilterOptions}
					</div>
				</>
			) : (
				<>
					<div className="exportRowCompact">
						<div className="exportModesCompact">{exportModes}</div>
						<div className="exportModeDividerCompact" />
						<div className="exportFiltersCompact">{exportFilterOptions}</div>
					</div>
				</>
			)}
			<textarea className="exportData" readOnly>
				{props.wishlist
					.map((wishlistItem) => wishlistItem.formattedTitle())
					.join(", ")}
			</textarea>
		</Modal>
	);
}
