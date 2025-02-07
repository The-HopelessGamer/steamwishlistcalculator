import "./side_panel.css";
import CrossIcon from "./icons/times-solid.svg?react";
import { BaseButton } from "../design_system/base_button/base_button";
import { Link } from "react-router";

type SidePanelProps = {};

export function SidePanel({}: SidePanelProps) {
	return (
		<div className="sidePanel">
			<BaseButton onClick={() => console.log("close")}>
				<CrossIcon className="sidePanelCloseButton" />
			</BaseButton>
			<div className="sidePanelRow">
				<Link to="/">
					<b>Home</b>
				</Link>
			</div>
			<div className="sidePanelRow">
				<Link to="/faq">
					<b>FAQ</b>
				</Link>
			</div>
			<div className="sidePanelRow">
				<Link to="/partners">
					<b>Partners</b>
				</Link>
			</div>
			<div className="sidePanelRow">
				<a
					href="https://steamcommunity.com/groups/SteamWishlistCalculator"
					target="blank"
				>
					<b>Steam Group</b>
				</a>
			</div>
			<div className="sidePanelRow">
				<a href="https://discord.com/invite/abyAUJU" target="blank">
					<b>Discord</b>
				</a>
			</div>
			<div className="sidePanelRow">
				<a
					href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
					target="blank"
				>
					<b>Github</b>
				</a>
			</div>
		</div>
	);
}
