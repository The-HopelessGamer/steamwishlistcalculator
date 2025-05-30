import styles from "./side_panel.module.css";
import CrossIcon from "../design_system/icons/times-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";
import { Link } from "react-router";
import { Dropdown } from "../design_system/dropdown/dropdown";
import { COUNTRY_MAPPINGS } from "../utils";

type SidePanelProps = {
	onClickClose: () => void;
	setCountryCode: (countryCode: string) => void;
	countryCode: string;
};

export function SidePanel(props: SidePanelProps) {
	return (
		<div className={styles.sidePanel}>
			<BaseButton
				className={styles.sidePanelCloseButton}
				onClick={props.onClickClose}
			>
				<CrossIcon className={styles.sidePanelCloseButtonIcon} />
			</BaseButton>
			<Link
				to="/"
				className={styles.sidePanelLink}
				onClick={props.onClickClose}
			>
				Home
			</Link>
			<Link
				to="/faq"
				className={styles.sidePanelLink}
				onClick={props.onClickClose}
			>
				FAQ
			</Link>
			<Link
				to="/partners"
				className={styles.sidePanelLink}
				onClick={props.onClickClose}
			>
				Partners
			</Link>

			<a
				className={styles.sidePanelLink}
				href="https://steamcommunity.com/groups/SteamWishlistCalculator"
				target="blank"
			>
				Steam Group
			</a>

			<a
				href="https://discord.com/invite/abyAUJU"
				target="blank"
				className={styles.sidePanelLink}
			>
				Discord
			</a>

			<a
				className={styles.sidePanelLink}
				href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
				target="blank"
			>
				Github
			</a>
			<div className={styles.sidePanelDropdownContainer}>
				<Dropdown
					onChange={(value) => {
						props.setCountryCode(value);
						props.onClickClose();
					}}
					options={[...COUNTRY_MAPPINGS.entries()].map(
						([countryCode, countryDetails]) => ({
							value: countryCode,
							label: countryDetails.countryName,
						})
					)}
					value={props.countryCode}
				/>
			</div>
		</div>
	);
}
