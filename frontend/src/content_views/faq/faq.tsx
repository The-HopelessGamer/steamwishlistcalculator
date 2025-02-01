import { ContentBox } from "../../design_system/content_box/content_box";
import "./faq.css";

type QuestionAnswer = {
	question: string;
	answer: string;
};

const questionAnswers: QuestionAnswer[] = [
	{
		question: "Does this calculate discount prices?",
		answer:
			"If a product is on sale, it will calculate the sale price instead of its normal price.",
	},
	{
		question: "Does this calculate dlc?",
		answer: "Any wishlisted DLC are included in the calculation.",
	},
	{
		question: "What is Steam Wishlist Calculator and what does it do?",
		answer:
			"Steam Wishlist Calculator is a website devoted to calculating the total value of a Steam users wishlist.",
	},
	{
		question: "Can this website compromise my account?",
		answer:
			"This website will not compromise your account in any way shape or form. We do not collect or store user data.",
	},
	{
		question: "Is this website safe?",
		answer:
			"This website does not store user data and it does not have any login forms, meaning there is no risk of your credentials being phished. This website uses your Steam ID which is publicly available and used to get your wishlist data (Assuming your wishlist is public in the first place) to calculate the total cost and provide additional information.",
	},
	{
		question: "My Steam ID goes into the URL. Can that compromise my account?",
		answer:
			"The URL parameters are generated from your steam ID or Custom Steam ID if your wishlist succesfully calculates. It uses the parameters for form submission for the purpose of allowing the user to share their wishlist calculation result.",
	},
	{
		question:
			"What is the maximum wishlist Size that this website will calculate and why?",
		answer:
			"There is no limit. Go your hardest. The biggest Wishlist I have calculated is 60,000 games.",
	},
	{
		question: "Why did i make this website?",
		answer:
			"I decided to use this as a project for learning javascript and getting better at over all web development. I have been looking for years to find a website like this and never found one. Because I was learning web development, i thought this would be a good project to work on.",
	},
	{
		question: "What was the goal of this website?",
		answer:
			"The goal was that this website had to be user friendly, clean, easy to use and overly simplistic. So far i think i have achieved that pretty well.",
	},
	{
		question: "Does this website use the Steam API?",
		answer:
			"As of 2024, the site was rebuilt and now uses the Steam API to request data.",
	},
	{
		question: "Does this website have a database?",
		answer:
			"This website does not currently have a database. Maybe one day it will but for the time being it does not.",
	},
];

export function Faq() {
	return (
		<ContentBox color="white">
			<h1 className="faqTitle">FAQ</h1>
			{questionAnswers.map((questionAnswer, index) => (
				<div className="questionAnswerContainer" key={index}>
					<ContentBox color="grey">
						<p>
							<b>Question: </b>
							{questionAnswer.question}
						</p>
						<p>
							<b>Answer: </b>
							{questionAnswer.answer}
						</p>
					</ContentBox>
				</div>
			))}
		</ContentBox>
	);
}
