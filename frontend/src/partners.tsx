export type Partner = {
	name: string;
	description: string;
	url: string;
};

export const partners: Partner[] = [
	{
		name: "Steam Ladder",
		description:
			"Steam Ladder is a ranking and stats website for Steam profiles. View your worldwide or country rank in playtime, level, games owned, and more.",
		url: "https://steamladder.com/",
	},
	{
		name: "Steam BackLog",
		description:
			"Steam Backlog is a Steam library manager built with simplicity in mind.",
		url: "https://steam-backlog.com/",
	},
	{
		name: "Steam.Design",
		description: "A small tool to crop Steam profile backgrounds to showcases.",
		url: "https://steam.design/",
	},
	{
		name: "Steam Level Up",
		description:
			"The Cheapest and Fastest Way to Level Up Your Steam Profile. Buy Steam Levels with Card, Crypto, CS2 Skins, and Steam Gems!",
		url: "https://steamlevelup.com/",
	},
];
