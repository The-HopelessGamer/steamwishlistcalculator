import "./wishlist_form.css";
import { ContentBox } from "../../design_system/content_box/content_box";
import { PrimaryButton } from "../../design_system/primary_button/primary_button";
import { useNavigate } from "react-router";
import { Loader } from "../../design_system/loader/loader";

type WishlistFormProps = {
	totalWishlistsCalculated: number | undefined;
};

const FROM_INPUT_NAME = "steamIdInput";

export function WishlistForm(props: WishlistFormProps) {
	const navigate = useNavigate();

	return (
		<div className="wishlistForm">
			<ContentBox color="white">
				<span className="wishlistFormTitle">Calculate Your Wishlist</span>
				<span className="wishlistFormTotal">
					Total Wishlists Calculated:{" "}
					{props.totalWishlistsCalculated ? (
						props.totalWishlistsCalculated.toLocaleString("en-US")
					) : (
						<span className="wishlistFormTotalLoader">
							<Loader color="black" />
						</span>
					)}
				</span>
				<form
					action={(formData) => {
						navigate(`/wishlist/${formData.get(FROM_INPUT_NAME)}`);
					}}
				>
					<input
						type="text"
						className="wishlistFormInput"
						placeholder="Steam ID"
						name={FROM_INPUT_NAME}
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
