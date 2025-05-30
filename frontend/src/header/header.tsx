import styles from "./header.module.css";
import { Link } from "react-router";
import HomeIcon from "../design_system/icons/home-solid.svg?react";
import FaqIcon from "../design_system/icons/question-circle-regular.svg?react";
import PartnerIcon from "../design_system/icons/handshake-solid.svg?react";
import SteamIcon from "../design_system/icons/steam-brands-solid.svg?react";
import DiscordIcon from "../design_system/icons/discord-brands-solid.svg?react";
import GithubIcon from "../design_system/icons/github-brands-solid.svg?react";
import HamburgerIcon from "../design_system/icons/bars-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";
import { COUNTRY_MAPPINGS } from "../utils";
import { CountryDropdown } from "./country_dropdown/country_dropdown";

type HeaderProps = {
	onClickSidePanel: () => void;
	setCountryCode: (countryCode: string) => void;
	countryCode: string;
};

export function Header(props: HeaderProps) {
	return (
		<div className={styles.header}>
			<Link to="/">
				<h1 className={styles.headerTitle}>Steam Wishlist Calculator</h1>
			</Link>
			<div className={styles.headerIcons}>
				<CountryDropdown
					onChange={props.setCountryCode}
					options={[...COUNTRY_MAPPINGS.entries()].map(
						([countryCode, countryDetails]) => ({
							value: countryCode,
							label: countryDetails.countryName,
						})
					)}
					value={props.countryCode}
				/>
				<Link to="/">
					<HomeIcon className={styles.headerIcon} />
				</Link>
				<Link to="/faq">
					<FaqIcon className={styles.headerIcon} />
				</Link>
				<Link to="/partners">
					<PartnerIcon className={styles.headerIcon} />
				</Link>
				<a
					href="https://steamcommunity.com/groups/SteamWishlistCalculator"
					target="blank"
				>
					<SteamIcon className={styles.headerIcon} />
				</a>
				<a href="https://discord.com/invite/abyAUJU" target="blank">
					<DiscordIcon className={styles.headerIcon} />
				</a>
				<a
					href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
					target="blank"
				>
					<GithubIcon className={styles.headerIcon} />
				</a>
			</div>
			<div className={styles.headerSidebarButtonContainer}>
				<BaseButton onClick={props.onClickSidePanel}>
					<HamburgerIcon className={styles.headerIcon} />
				</BaseButton>
			</div>
		</div>
	);
}
