import "./wishlist.css";
import { useParams } from "react-router";
import { Loader } from "../../design_system/loader/loader";
import { ContentBox } from "../../design_system/content_box/content_box";

export function Wishlist() {
	const { wishlistId } = useParams();

	return (
		<span className="wishlistLoaderContainer">
			<ContentBox color="white">
				<div className="wishlistCalculatingTitle">
					Calculating Your Wishlist <Loader color="black" />
				</div>
			</ContentBox>
		</span>
	);
}
