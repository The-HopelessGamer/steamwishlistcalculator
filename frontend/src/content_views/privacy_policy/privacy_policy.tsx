import { ContentBox } from "../../design_system/content_box/content_box";
import styles from "./privacy_policy.module.css";

export function PrivacyPolicy() {
	return (
		<ContentBox color="white">
			<h1 className={styles.privacyPolicyTitle}>Privacy Policy</h1>
			<p>
				<b>Scope of this Privacy Policy</b>
				<br />
				<span>
					This privacy policy discloses the privacy practices for{" "}
					<a
						href="https://www.steamwishlistcalculator.com/"
						title="Steam Wishlist Calculator"
					>
						https://www.steamwishlistcalculator.com/
					</a>{" "}
					and applies solely to information collected by this website.
				</span>
			</p>
			<p>
				<b>Information Collection, Use, and Sharing</b>
				<br />
				<span>
					We are the sole owners of the information collected on this site. We
					only have access to publicly available information and are only able
					to collect information that you voluntarily provide via email or other
					direct contact from you. We will not sell or rent this information to
					anyone. We will use your information to respond to you, regarding the
					reason you contacted us.
				</span>
			</p>
			<p>
				<b>Google Analytics</b>
				<br />
				<span>
					This site uses cookies from Google Analytics to analyze website
					traffic. By using this site, you consent to the processing of data by
					Google as described in their{" "}
					<a href="https://policies.google.com/privacy" target="_blank">
						Privacy Policy
					</a>
					.
				</span>
			</p>
			<p>
				<b>Security</b>
				<br />
				<span>
					We take precautions to protect your information. When you submit
					sensitive information on our contact form in which you must provide
					information such as Full Name and Email via the website, your
					information is protected both online and offline.
				</span>
			</p>
			<p>
				<b>- Updated: 30/11/2024</b>
			</p>
		</ContentBox>
	);
}
