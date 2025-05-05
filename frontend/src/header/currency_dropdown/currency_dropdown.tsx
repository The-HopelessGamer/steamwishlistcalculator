import { useState } from "react";
import { classNames } from "../../utils";
import "./currency_dropdown.css";
import { DropdownProps, Dropdown } from "../../design_system/dropdown/dropdown";

export function CurrencyDropdown(props: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = props.options.find((opt) => opt.value === props.value);

	return (
		<div className="currencyDropdownContainer">
			<div
				className="currencyDropdownTrigger"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{selectedOption?.label || "Select option"}</span>
				<span
					className={classNames([
						"currencyDropdownArrow",
						isOpen && "currencyDropdownArrowUp",
					])}
				>
					▼
				</span>
			</div>

			{isOpen && (
				<div className="currencyDropdownMenu">
					{props.options.map((option) => (
						<div
							key={option.value}
							className={classNames([
								"currencyDropdownOption",
								option.value === props.value &&
									"currencyDropdownOptionSelected",
							])}
							onClick={() => {
								props.onChange(option.value);
								setIsOpen(false);
							}}
						>
							{option.label}
						</div>
					))}
				</div>
			)}

			<div style={{ display: "none" }}>
				<Dropdown {...props} />
			</div>
		</div>
	);
}
