import { useNavigate } from "react-router";
import { ContentBox } from "../../../design_system/content_box/content_box";
import { PrimaryButton } from "../../../design_system/primary_button/primary_button";
import "./calculate_error.css";

type CalculateErrorProps = {
	text: string;
};

export function CalculateError(props: CalculateErrorProps) {
	const navigate = useNavigate();

	return (
		<ContentBox color="white">
			<p className="calculateErrorText">Error: {props.text}</p>
			<PrimaryButton text="Back" onClick={() => navigate("/")} />
		</ContentBox>
	);
}
