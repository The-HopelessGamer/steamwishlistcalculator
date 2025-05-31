import SteamDesign from "./logos/SteamDesign.jpg";
import SteamBacklog from "./logos/SteamBacklog.jpg";
import SteamLadder from "./logos/SteamLadder.png";
import SteamLevelUp from "./logos/SteamLevelUp.png";

export type Partner = {
	name: string;
	description: string;
	url: string;
	logoUrl: string;
};

export const partners: Partner[] = [
	{
		name: "Steam Ladder",
		description:
			"Steam Ladder is a ranking and stats website for Steam profiles. View your worldwide or country rank in playtime, level, games owned, and more.",
		url: "https://steamladder.com/",
		logoUrl: SteamLadder,
	},
	{
		name: "Steam BackLog",
		description:
			"Steam Backlog is a Steam library manager built with simplicity in mind.",
		url: "https://steam-backlog.com/",
		logoUrl: SteamBacklog,
	},
	{
		name: "Steam.Design",
		description: "A small tool to crop Steam profile backgrounds to showcases.",
		url: "https://steam.design/",
		logoUrl: SteamDesign,
	},
	{
		name: "Steam Level Up",
		description:
			"The Cheapest and Fastest Way to Level Up Your Steam Profile. Buy Steam Levels with Card, Crypto, CS2 Skins, and Steam Gems!",
		url: "https://steamlevelup.com/",
		logoUrl: SteamLevelUp,
	},
];
