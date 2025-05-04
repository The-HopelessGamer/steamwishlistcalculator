import "./header.css";
import { Link } from "react-router";
import HomeIcon from "../design_system/icons/home-solid.svg?react";
import FaqIcon from "../design_system/icons/question-circle-regular.svg?react";
import PartnerIcon from "../design_system/icons/handshake-solid.svg?react";
import SteamIcon from "../design_system/icons/steam-brands-solid.svg?react";
import DiscordIcon from "../design_system/icons/discord-brands-solid.svg?react";
import GithubIcon from "../design_system/icons/github-brands-solid.svg?react";
import HamburgerIcon from "../design_system/icons/bars-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";
import { Dropdown } from "../design_system/dropdown/dropdown";
import { COUNTRY_MAPPINGS } from "../utils";

type HeaderProps = {
	onClickSidePanel: () => void;
	setCountryCode: (countryCode: string) => void;
	countryCode: string;
};

export function Header(props: HeaderProps) {
	return (
		<div className="header">
			<Link to="/">
				<h1 className="headerTitle">Steam Wishlist Calculator</h1>
			</Link>
			<div className="headerIcons">
				<Dropdown
					onChange={props.setCountryCode}
					options={[...COUNTRY_MAPPINGS.entries()].map(
						([countryCode, countryDetails]) => ({
							value: countryCode,
							label: `${countryDetails.currencyName} (${countryDetails.currency})`,
						})
					)}
					value={props.countryCode}
				/>
				<Link to="/">
					<HomeIcon className="headerIcon" />
				</Link>
				<Link to="/faq">
					<FaqIcon className="headerIcon" />
				</Link>
				<Link to="/partners">
					<PartnerIcon className="headerIcon" />
				</Link>
				<a
					href="https://steamcommunity.com/groups/SteamWishlistCalculator"
					target="blank"
				>
					<SteamIcon className="headerIcon" />
				</a>
				<a href="https://discord.com/invite/abyAUJU" target="blank">
					<DiscordIcon className="headerIcon" />
				</a>
				<a
					href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
					target="blank"
				>
					<GithubIcon className="headerIcon" />
				</a>
			</div>
			<div className="headerSidebarButtonContainer">
				<BaseButton onClick={props.onClickSidePanel}>
					<HamburgerIcon className="headerIcon" />
				</BaseButton>
			</div>
		</div>
	);
}
