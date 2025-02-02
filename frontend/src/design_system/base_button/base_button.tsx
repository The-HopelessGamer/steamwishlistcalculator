import React from "react";
import "./base_button.css";

type BaseButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
};

export function BaseButton(props: BaseButtonProps) {
	return (
		<button className="baseButton" onClick={props.onClick}>
			{props.children}
		</button>
	);
}
