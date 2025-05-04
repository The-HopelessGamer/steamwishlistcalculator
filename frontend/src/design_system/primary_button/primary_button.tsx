import "./primary_button.css";
import { BaseButton } from "../base_button/base_button";
import type { BaseButtonProps } from "../base_button/base_button";
import { classNames } from "../../utils";

type PrimaryButtonProps = Omit<BaseButtonProps, "className" | "children"> & {
	text: string;
};

export function PrimaryButton(props: PrimaryButtonProps) {
	return (
		<BaseButton
			className={classNames([
				"primaryButton",
				props.disabled ? "primaryButtonDisabled" : "primaryButtonEnabled",
			])}
			{...props}
		>
			{props.text}
		</BaseButton>
	);
}
