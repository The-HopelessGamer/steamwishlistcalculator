import "./modal.css";
import { ContentBox } from "../content_box/content_box";
import { BaseButton } from "../base_button/base_button";
import CrossIcon from "../icons/times-solid.svg?react";

type ModalProps = {
	title: string;
	onClickClose: () => void;
	ref: React.RefObject<HTMLDialogElement | null>;
	children: React.ReactNode;
};

export function Modal(props: ModalProps) {
	return (
		<dialog
			ref={props.ref}
			aria-modal="true"
			aria-labelledby="modalDialogTitle"
			className="modalDialog"
		>
			<div className="modalDialogContainer" onClick={props.onClickClose}>
				<div className="modalDialogFixedWidthContainer">
					<div onClick={(event) => event.stopPropagation()}>
						<ContentBox color="white">
							<div className="modalDialogHeader">
								<h2 id="modalDialogTitle">{props.title}</h2>
								<BaseButton
									className="modalDialogCloseButton"
									onClick={props.onClickClose}
								>
									<CrossIcon className="modalDialogCloseButtonIcon" />
								</BaseButton>
							</div>
							{props.children}
						</ContentBox>
					</div>
				</div>
			</div>
		</dialog>
	);
}
