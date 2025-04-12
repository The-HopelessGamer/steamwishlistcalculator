import "./modal.css";
import { BaseButton } from "../base_button/base_button";
import CrossIcon from "../icons/times-solid.svg?react";
import { PrimaryButton } from "../primary_button/primary_button";

type ModalProps = {
	onClickClose: () => void;
	ref: React.RefObject<HTMLDialogElement | null>;
};

export function Modal(props: ModalProps) {
	return (
		<dialog
			ref={props.ref}
			aria-modal="true"
			aria-labelledby="exportModalTitle"
			className="exportModalDialog"
		>
			<div className="exportModal">
				<div className="exportModalContent">
					<div className="exportModalHeader">
						<div className="exportModalHeaderContainer">
							<h2 id="exportModalTitle" className="exportModalTitle">
								Export Wishlist
							</h2>
							<BaseButton
								className="exportModalCloseButton"
								onClick={props.onClickClose}
							>
								<CrossIcon className="exportModalCloseButtonIcon" />
							</BaseButton>
						</div>
					</div>
					<div className="exportModalBody">
						<div className="exportModalButtonHeader">
							<div className="exportModalButton exportModalButtonTitle">
								<PrimaryButton text="Titles" />
							</div>
							<div className="exportModalButton">
								<PrimaryButton text="Free" />
							</div>
							<div className="exportModalButton">
								<PrimaryButton text="On Sale" />
							</div>
							<div className="exportModalButton">
								<PrimaryButton text="Pre Order" />
							</div>
							<div className="exportModalButton">
								<PrimaryButton text="Appids" />
							</div>
							<div className="exportModalButton">
								<PrimaryButton text="Unlisted" />
							</div>
						</div>
						<div className="exportModalWishlist">
							Killing Floor 3 | Marvel’s Spider-Man Remastered | Subnautica 2 |
							Avowed | FINAL FANTASY XVI | Outbound | Revenge of the Savage
							Planet | Screenbound | Escape Simulator 2 | BOKURA: planet |
							Eternal Strands | Marvel's Spider-Man 2 | Parallel Experiment |
							Marvel’s Spider-Man: Miles Morales | Witchbrook | Truck World:
							Australia
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
}
