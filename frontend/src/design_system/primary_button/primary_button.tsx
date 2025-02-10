import "./primary_button.css";
import { BaseButton } from "../base_button/base_button";
import type { BaseButtonProps } from "../base_button/base_button";

type PrimaryButtonProps = Pick<BaseButtonProps, "onClick"> & {
	text: string;
};

export function PrimaryButton(props: PrimaryButtonProps) {
	return (
		<BaseButton className="primaryButton" onClick={props.onClick}>
			{props.text}
		</BaseButton>
	);
}
