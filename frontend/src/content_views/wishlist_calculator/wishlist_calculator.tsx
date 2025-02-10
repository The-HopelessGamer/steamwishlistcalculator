import "./wishlist_calculator.css";
import { ContentBox } from "../../design_system/content_box/content_box";
import { PrimaryButton } from "../../design_system/primary_button/primary_button";

type WishlistCalculatorProps = {
	totalWishlistsCalculated: number;
	onClickCalculate: () => void;
};

export function WishlistCalculator(props: WishlistCalculatorProps) {
	return (
		<div className="wishlistCalculator">
			<ContentBox color="white">
				<span className="calculatorTitle">Calculate Your Wishlist</span>
				<span className="calculatorTotal">
					Total Wishlists Calculated: {props.totalWishlistsCalculated}
				</span>
				<form>
					<input
						type="text"
						className="calculatorInput"
						placeholder="Steam ID"
						required
					></input>
					<p>Supports:</p>
					<ul className="supportedValuesList">
						<li>Steam ID64</li>
						<li>Steam Profile URL</li>
						<li>Steam Custom URL</li>
						<li>Steam Wishlist URL</li>
					</ul>
					<PrimaryButton onClick={props.onClickCalculate} text="Calculate" />
				</form>
			</ContentBox>
		</div>
	);
}
