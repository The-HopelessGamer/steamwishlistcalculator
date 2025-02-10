import "./App.css";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Routes, Route } from "react-router";
import { PrivacyPolicy } from "./content_views/privacy_policy/privacy_policy";
import { Faq } from "./content_views/faq/faq";
import { Partners } from "./content_views/partners/partners";
import { WishlistCalculator } from "./content_views/wishlist_calculator/wishlist_calculator";
import { SidePanel } from "./side_panel/side_panel";
import { useState } from "react";
import { classNames } from "./utils";

function App() {
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	return (
		<div className={classNames(["app", sidePanelOpen && "appNoScroll"])}>
			<div className="mobileView">
				<Header onClickSidePanel={() => setSidePanelOpen(true)} />
				<div className="contentContainer">
					<div className="fixedWidthContainer">
						<Routes>
							<Route path="/" element={<WishlistCalculator />} />
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
