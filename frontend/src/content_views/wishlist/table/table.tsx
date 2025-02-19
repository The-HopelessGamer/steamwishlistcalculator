import { ContentBox } from "../../../design_system/content_box/content_box";

type TableProps = {
	profileName: string;
	wishlist: object;
};

export function Table({ profileName, wishlist }: TableProps) {
	return (
		<ContentBox color="white">
			<p>{profileName}</p>
			<p>{JSON.stringify(wishlist)}</p>
		</ContentBox>
	);
}
