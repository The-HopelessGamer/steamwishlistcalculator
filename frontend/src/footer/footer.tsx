import styles from "./footer.module.css";
import { Delimited } from "../design_system/delimited/delimited";
import { Link } from "react-router";
import { partners } from "../partners";

export function Footer() {
	return (
		<div className={styles.footer}>
			<p className={styles.footerText}>
				<Delimited
					elements={[
						<Link to="/privacy-policy">Privacy Policy</Link>,
						<Link to="/faq">FAQ</Link>,
						<a
							href="https://github.com/The-HopelessGamer/steamwishlistcalculator"
							target="_blank"
						>
							Source Code
						</a>,
						<span>
							<b>Partners: </b>
							<Delimited
								elements={partners.map((partner, index) => (
									<a
										key={index}
										href={partner.url}
										title={partner.description}
										target="_blank"
									>
										{partner.name}
									</a>
								))}
								delimiter=" | "
							/>
						</span>,
						<Link to="/partners">View All Partners</Link>,
					]}
					delimiter=" - "
				/>
			</p>
			<p className={styles.footerText}>
				This website is Not affiliated with Valve Corporation, Steam, or any of
				their partners. All Copyrights & Trademarks reserved to their respective
				owners.
			</p>
			<p className={styles.footerText}>
				<span>Website owned & developed by </span>
				<a
					href="http://steamcommunity.com/id/The_HopelessGamer"
					target="_blank"
				>
					The HopelessGamer
				</a>
				<span> 2018 - </span>
				<span>{new Date().getFullYear()}</span>
			</p>
		</div>
	);
}
