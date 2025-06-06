import styles from "./switch.module.css";
import { BaseButton } from "../base_button/base_button";
import { classNames } from "../../utils";

type SwitchProps = {
	on: boolean;
	onChange: (value: boolean) => void;
	children: React.ReactNode;
};

export function Switch(props: SwitchProps) {
	return (
		<BaseButton
			onClick={() => {
				props.onChange(!props.on);
			}}
			className={classNames([
				styles.switch,
				props.on ? styles.switchOn : styles.switchOff,
			])}
		>
			{props.children}
		</BaseButton>
	);
}
