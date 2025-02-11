import "./App.css";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Routes, Route } from "react-router";
import { PrivacyPolicy } from "./content_views/privacy_policy/privacy_policy";
import { Faq } from "./content_views/faq/faq";
import { Partners } from "./content_views/partners/partners";
import { WishlistForm } from "./content_views/wishlist_form/wishlist_form";
import { SidePanel } from "./side_panel/side_panel";
import { useState } from "react";
import { classNames } from "./utils";
import { Wishlist } from "./content_views/wishlist/wishlist";
import { useEffect } from "react";
import { counterRead } from "./backend_api";

function App() {
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [totalWishlistsCalculated, setTotalWishlistsCalculated] = useState<
		number | undefined
	>(undefined);

	useEffect(() => {
		counterRead().then((serviceResponse) => {
			if (serviceResponse.ok) {
				setTotalWishlistsCalculated(serviceResponse.data);
			}
		});
	});

	return (
		<div className={classNames(["app", sidePanelOpen && "appNoScroll"])}>
			<div className="mobileView">
				<Header onClickSidePanel={() => setSidePanelOpen(true)} />
				<div className="contentContainer">
					<div className="fixedWidthContainer">
						<Routes>
							<Route
								path="/"
								element={
									<WishlistForm
										totalWishlistsCalculated={totalWishlistsCalculated}
									/>
								}
							/>
							<Route path="/wishlist/:wishlistId" element={<Wishlist />} />
							<Route path="/faq" element={<Faq />} />
							<Route path="/partners" element={<Partners />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						</Routes>
					</div>
				</div>
			</div>
			<Footer />
			<div
				className={classNames([
					"sidePanelContainer",
					!sidePanelOpen && "sidePanelContainerHidden",
				])}
			>
				<SidePanel onClickClose={() => setSidePanelOpen(false)} />
			</div>
		</div>
	);
}

export default App;
