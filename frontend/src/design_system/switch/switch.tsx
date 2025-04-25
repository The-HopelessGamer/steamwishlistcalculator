import "./switch.css";
import { BaseButton } from "../base_button/base_button";
import { classNames } from "../../utils";

type SwitchProps = {
	on: boolean;
	onChange: boolean; //(value: boolean) => void; //Need to update with functioning logic.
	children: React.ReactNode;
};

export function Switch(props: SwitchProps) {
	return (
		<BaseButton
			onClick={() => {
				//props.onChange(!props.on); //Need to update with functioning logic.
			}}
			className={classNames(["switch", props.on ? "switchOn" : "switchOff"])}
		>
			{props.children}
		</BaseButton>
	);
}
