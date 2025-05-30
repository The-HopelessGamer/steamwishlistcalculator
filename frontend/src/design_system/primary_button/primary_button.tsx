import styles from "./primary_button.module.css";
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
				styles.primaryButton,
				props.disabled
					? styles.primaryButtonDisabled
					: styles.primaryButtonEnabled,
			])}
			{...props}
		>
			{props.text}
		</BaseButton>
	);
}
