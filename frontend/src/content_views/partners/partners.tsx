import { ContentBox } from "../../design_system/content_box/content_box";
import "./partners.css";
import { partners } from "../../partners";

export function Partners() {
	return (
		<ContentBox color="white">
			<h1 className="partnersTitle">Partners</h1>
			{partners.map((partner, index) => (
				<div className="partnerContainer" key={index}>
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
