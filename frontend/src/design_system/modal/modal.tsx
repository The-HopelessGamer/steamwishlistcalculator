import "./modal.css";
import { BaseButton } from "../base_button/base_button";
import CrossIcon from "../icons/times-solid.svg?react";

type ModalProps = {
	onClickClose: () => void;
	ref: React.RefObject<HTMLDialogElement | null>;
	children?: React.ReactNode;
};

export function Modal(props: ModalProps) {
	return (
		<div
			onClick={() => {
				props.onClickClose();
			}}
		>
			<dialog
				ref={props.ref}
				aria-modal="true"
				aria-labelledby="dialog-title"
				className="modal-dialog"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				<h2 id="dialog-title">Modal Dialog</h2>
				<BaseButton
					className="exportModalCloseButton"
					onClick={props.onClickClose}
				>
					<CrossIcon className="exportModalCloseButtonIcon" />
				</BaseButton>
				<div>{props.children}</div>
			</dialog>
		</div>
	);
}
