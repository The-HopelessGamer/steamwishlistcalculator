import React from "react";
import styles from "./base_button.module.css";
import { classNames } from "../../utils";

export type BaseButtonProps = {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	disabled?: boolean;
};

export function BaseButton(props: BaseButtonProps) {
	return (
		<button
			className={classNames([styles.baseButton, props.className])}
			onClick={props.onClick}
			type={props.type}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}
