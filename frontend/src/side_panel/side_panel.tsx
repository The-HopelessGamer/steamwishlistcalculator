import "./side_panel.css";
import CrossIcon from "./icons/times-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";
import { Link } from "react-router";

type SidePanelProps = {
	onClickClose: () => void;
};

export function SidePanel(props: SidePanelProps) {
	return (
		<div className="sidePanel">
			<BaseButton onClick={props.onClickClose}>
				<CrossIcon className="sidePanelCloseButton" />
			</BaseButton>
			<Link to="/" className="sidePanelLink" onClick={props.onClickClose}>
				<b>Home</b>
			</Link>
			<Link to="/faq" className="sidePanelLink" onClick={props.onClickClose}>
				<b>FAQ</b>
			</Link>
			<Link
				to="/partners"
				className="sidePanelLink"
				onClick={props.onClickClose}
			>
				<b>Partners</b>
			</Link>

			<a
				className="sidePanelLink"
				href="https://steamcommunity.com/groups/SteamWishlistCalculator"
				target="blank"
			>
				<b>Steam Group</b>
			</a>

			<a
				href="https://discord.com/invite/abyAUJU"
				target="blank"
				className="sidePanelLink"
			>
				<b>Discord</b>
			</a>

			<a
				className="sidePanelLink"
				href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
				target="blank"
			>
				<b>Github</b>
			</a>
		</div>
	);
}
