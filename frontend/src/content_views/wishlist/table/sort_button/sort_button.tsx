import { BaseButton } from "../../../../design_system/base_button/base_button";
import { classNames } from "../../../../utils";
import { sortingFunctions } from "../sorting";
import CaretIcon from "../../../../design_system/icons/caret-down-solid.svg?react";
import styles from "./sort_button.module.css";

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
				styles.tableHeaderSortButtonActive,
				!isActive && styles.tableHeaderSortButtonInactive,
			])}
			onClick={() => props.onClick(props.sortKey)}
		>
			{props.text}
			<CaretIcon
				className={classNames([
					styles.tableHeaderSortButtonIcon,
					props.isReversed && isActive && styles.tableHeaderSortButtonReversed,
				])}
			/>
		</BaseButton>
	);
}
