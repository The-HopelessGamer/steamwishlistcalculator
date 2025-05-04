import "./loading.css";
import { Loader } from "../../../design_system/loader/loader";
import { ContentBox } from "../../../design_system/content_box/content_box";

export function Loading() {
	return (
		<span className="wishlistLoaderContainer">
			<ContentBox color="white">
				<div className="wishlistCalculatingTitle">
					Calculating Your Wishlist
					<span className="wishlistCalculatingTitleLoader">
						<Loader color="black" />
					</span>
				</div>
			</ContentBox>
		</span>
	);
}
