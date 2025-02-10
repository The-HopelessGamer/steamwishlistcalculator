import React from "react";
import "./base_button.css";
import { classNames } from "../../utils";

export type BaseButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
};

export function BaseButton(props: BaseButtonProps) {
	return (
		<button
			className={classNames(["baseButton", props.className])}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
