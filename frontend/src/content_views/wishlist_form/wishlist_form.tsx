import "./wishlist_form.css";
import { ContentBox } from "../../design_system/content_box/content_box";
import { PrimaryButton } from "../../design_system/primary_button/primary_button";
import { useNavigate } from "react-router";
import { Loader } from "../../design_system/loader/loader";
import { useState } from "react";
import { extractSteamId } from "../../utils";

type WishlistFormProps = {
	totalWishlistsCalculated: number | undefined;
};

export function WishlistForm({ totalWishlistsCalculated }: WishlistFormProps) {
	const navigate = useNavigate();
	const [steamId, setSteamId] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Extract the ID before navigation
		const processedId = extractSteamId(steamId);
		navigate(`/wishlist/${processedId}`);
	};

	return (
		<div className="wishlistForm">
			<ContentBox color="white">
				<span className="wishlistFormTitle">Calculate Your Wishlist</span>
				<span className="wishlistFormTotal">
					Total Wishlists Calculated:{" "}
					{totalWishlistsCalculated ? (
						totalWishlistsCalculated.toLocaleString("en-US")
					) : (
						<span className="wishlistFormTotalLoader">
							<Loader color="black" />
						</span>
					)}
				</span>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={steamId}
						onChange={(e) => setSteamId(e.target.value)}
						className="wishlistFormInput"
						placeholder="Steam ID"
						required
					/>
					<p>Supports:</p>
					<ul className="supportedValuesList">
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
