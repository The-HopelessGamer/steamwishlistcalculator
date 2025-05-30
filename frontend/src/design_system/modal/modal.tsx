import styles from "./modal.module.css";
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
			className={styles.modalDialog}
		>
			<div className={styles.modalDialogContainer} onClick={props.onClickClose}>
				<div className={styles.modalDialogFixedWidthContainer}>
					<div onClick={(event) => event.stopPropagation()}>
						<ContentBox color="white">
							<div className={styles.modalDialogHeader}>
								<h2 id="modalDialogTitle">{props.title}</h2>
								<BaseButton
									className={styles.modalDialogCloseButton}
									onClick={props.onClickClose}
								>
									<CrossIcon className={styles.modalDialogCloseButtonIcon} />
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
