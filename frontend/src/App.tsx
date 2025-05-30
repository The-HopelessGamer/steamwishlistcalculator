import "./App.css";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Routes, Route } from "react-router";
import { PrivacyPolicy } from "./content_views/privacy_policy/privacy_policy";
import { Faq } from "./content_views/faq/faq";
import { Partners } from "./content_views/partners/partners";
import { WishlistForm } from "./content_views/wishlist_form/wishlist_form";
import { SidePanel } from "./side_panel/side_panel";
import { useState, useEffect } from "react";
import { classNames } from "./utils";
import { Wishlist } from "./content_views/wishlist/wishlist";
import { ip2Country } from "./backend_api";
import { LoadState } from "./utils";
import { CalculateError } from "./content_views/wishlist/calculate_error/calculate_error";

function App() {
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [isAppScrollable, setIsAppScrollable] = useState(true);
	const [countryCode, setCountryCode] = useState("US");
	const [countryCodeLoading, setCountryCodeLoading] = useState(
		LoadState.Pending
	);

	useEffect(() => {
		if (countryCodeLoading === LoadState.Pending) {
			setCountryCodeLoading(LoadState.Loading);
			ip2Country().then((serviceResponse) => {
				if (serviceResponse.ok) {
					setCountryCode(serviceResponse.data);
					setCountryCodeLoading(LoadState.Loaded);
				} else {
					setCountryCodeLoading(LoadState.Failed);
				}
			});
		}
	}, [countryCodeLoading]);

	return (
		<div className={classNames(["app", !isAppScrollable && "appNoScroll"])}>
			<div className="mobileView">
				<Header
					onClickSidePanel={() => {
						setSidePanelOpen(true);
						setIsAppScrollable(false);
					}}
					setCountryCode={setCountryCode}
					countryCode={countryCode}
				/>
				<div className="contentContainer">
					<div className="fixedWidthContainer">
						<Routes>
							<Route path="/" element={<WishlistForm />} />
							<Route
								path="/wishlist/:wishlistId"
								element={
									<Wishlist
										countryCodeLoading={countryCodeLoading}
										countryCode={countryCode}
										setIsAppScrollable={setIsAppScrollable}
									/>
								}
							/>
							<Route path="/faq" element={<Faq />} />
							<Route path="/partners" element={<Partners />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="*" element={<CalculateError text="404" />} />
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
				<SidePanel
					onClickClose={() => {
						setSidePanelOpen(false);
						setIsAppScrollable(true);
					}}
					setCountryCode={setCountryCode}
					countryCode={countryCode}
				/>
			</div>
		</div>
	);
}

export default App;
