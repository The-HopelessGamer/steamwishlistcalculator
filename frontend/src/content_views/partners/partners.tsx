import { ContentBox } from "../../design_system/content_box/content_box";
import styles from "./partners.module.css";
import { partners } from "../../partners";

export function Partners() {
	return (
		<ContentBox color="white">
			<h1 className={styles.partnersTitle}>Partners</h1>
			{partners.map((partner, index) => (
				<div className={styles.partnerContainer} key={index}>
					<ContentBox color="grey">
						<p>
							<b>
								<a href={partner.url} target="_blank">
									{partner.name}
								</a>
							</b>
						</p>
						<p>{partner.description}</p>
					</ContentBox>
				</div>
			))}
		</ContentBox>
	);
}
