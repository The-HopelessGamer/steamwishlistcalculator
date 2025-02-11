import React from "react";
import "./base_button.css";
import { classNames } from "../../utils";

export type BaseButtonProps = {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export function BaseButton(props: BaseButtonProps) {
	return (
		<button
			className={classNames(["baseButton", props.className])}
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
}
