import { BaseButton } from "../../../../design_system/base_button/base_button";
import { classNames } from "../../../../utils";
import { sortingFunctions } from "../sorting";
import CaretIcon from "./icons/caret-down-solid.svg?react";
import "./sort_button.css";

type SortButtonProps = {
	text: string;
	sortKey: keyof typeof sortingFunctions;
	onClick: (key: keyof typeof sortingFunctions) => void;
	currentSortKey: keyof typeof sortingFunctions;
	isReversed: boolean;
};

export function SortButton(props: SortButtonProps) {
	const isActive = props.sortKey === props.currentSortKey;

	return (
		<BaseButton
			className={classNames([
				"tableHeaderSortButtonActive",
				!isActive && "tableHeaderSortButtonInactive",
			])}
			onClick={() => props.onClick(props.sortKey)}
		>
			{props.text}
			<CaretIcon
				className={classNames([
					"tableHeaderSortButtonIcon",
					props.isReversed && isActive && "tableHeaderSortButtonReversed",
				])}
			/>
		</BaseButton>
	);
}
