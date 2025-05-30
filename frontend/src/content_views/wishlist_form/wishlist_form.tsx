import styles from "./wishlist_form.module.css";
import { ContentBox } from "../../design_system/content_box/content_box";
import { PrimaryButton } from "../../design_system/primary_button/primary_button";
import { useNavigate } from "react-router";
import { Loader } from "../../design_system/loader/loader";
import { extractSteamId, LoadState } from "../../utils";
import { useState, useEffect } from "react";
import { counterRead } from "../../backend_api";

export function WishlistForm() {
	const [totalWishlistsCalculated, setTotalWishlistsCalculated] = useState<
		number | undefined
	>(undefined);
	const [totalWishlistsCalculatedLoading, setTotalWishlistsCalculatedLoading] =
		useState(LoadState.Pending);

	const navigate = useNavigate();

	useEffect(() => {
		if (totalWishlistsCalculatedLoading === LoadState.Pending) {
			setTotalWishlistsCalculatedLoading(LoadState.Loading);
			counterRead().then((serviceResponse) => {
				if (serviceResponse.ok) {
					setTotalWishlistsCalculated(serviceResponse.data);
					setTotalWishlistsCalculatedLoading(LoadState.Loaded);
				} else {
					setTotalWishlistsCalculatedLoading(LoadState.Failed);
				}
			});
		}
	}, [totalWishlistsCalculatedLoading]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const inputValue = formData.get("steamId")?.toString() || "";
		const processedId = extractSteamId(inputValue);
		navigate(`/wishlist/${processedId}`);
	};

	return (
		<div className={styles.wishlistForm}>
			<ContentBox color="white">
				<span className={styles.wishlistFormTitle}>
					Calculate Your Wishlist
				</span>
				<span className={styles.wishlistFormTotal}>
					Total Wishlists Calculated:{" "}
					{totalWishlistsCalculated ? (
						totalWishlistsCalculated.toLocaleString("en-US")
					) : (
						<span className={styles.wishlistFormTotalLoader}>
							<Loader color="black" />
						</span>
					)}
				</span>
				<form onSubmit={handleSubmit} autoComplete="on">
					<input
						type="text"
						name="steamId"
						className={styles.wishlistFormInput}
						placeholder="Steam ID"
						required
						autoComplete="on"
					/>
					<p>Supports:</p>
					<ul className={styles.supportedValuesList}>
						<li>Steam ID64</li>
						<li>Steam Profile URL</li>
						<li>Steam Custom URL</li>
						<li>Steam Wishlist URL</li>
					</ul>
					<PrimaryButton type="submit" text="Calculate" />
				</form>
			</ContentBox>
		</div>
	);
}
