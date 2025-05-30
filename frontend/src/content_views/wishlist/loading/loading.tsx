import styles from "./loading.module.css";
import { Loader } from "../../../design_system/loader/loader";
import { ContentBox } from "../../../design_system/content_box/content_box";

export function Loading() {
	return (
		<span className={styles.wishlistLoaderContainer}>
			<ContentBox color="white">
				<div className={styles.wishlistCalculatingTitle}>
					Calculating Your Wishlist
					<span className={styles.wishlistCalculatingTitleLoader}>
						<Loader color="black" />
					</span>
				</div>
			</ContentBox>
		</span>
	);
}
