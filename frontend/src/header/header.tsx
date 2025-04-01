import "./header.css";
import { Link } from "react-router";
import HomeIcon from "./icons/home-solid.svg?react";
import FaqIcon from "./icons/question-circle-regular.svg?react";
import PartnerIcon from "./icons/handshake-solid.svg?react";
import SteamIcon from "./icons/steam-brands-solid.svg?react";
import DiscordIcon from "./icons/discord-brands-solid.svg?react";
import GithubIcon from "./icons/github-brands-solid.svg?react";
import HamburgerIcon from "./icons/bars-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";

type HeaderProps = {
	onClickSidePanel: () => void;
};

export function Header({ onClickSidePanel }: HeaderProps) {
	return (
		<div className="header">
			<Link to="/">
				<h1 className="headerTitle">Steam Wishlist Calculator</h1>
			</Link>
			<div className="headerIcons">
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
				<BaseButton onClick={onClickSidePanel}>
					<HamburgerIcon className="headerIcon" />
				</BaseButton>
			</div>
		</div>
	);
}
