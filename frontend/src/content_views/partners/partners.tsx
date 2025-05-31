import { ContentBox } from "../../design_system/content_box/content_box";
import styles from "./partners.module.css";
import { partners } from "../../partners/partners";

export function Partners() {
	return (
		<ContentBox color="white">
			<h1 className={styles.partnersTitle}>Partners</h1>
			{partners.map((partner, index) => (
				<div className={styles.partnerContainer} key={index}>
					<ContentBox color="grey">
						<div className={styles.partnerLogoContainer}>
							<img className={styles.partnerLogo} src={partner.logoUrl} />
							<div>
								<p>
									<b>
										<a href={partner.url} target="_blank">
											{partner.name}
										</a>
									</b>
								</p>
								<p>{partner.description}</p>
							</div>
						</div>
					</ContentBox>
				</div>
			))}
		</ContentBox>
	);
}
