import { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils";
import "./currency_dropdown.css";
import { DropdownProps, Dropdown } from "../../design_system/dropdown/dropdown";

export function CurrencyDropdown(props: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedOption = props.options.find((opt) => opt.value === props.value);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="currencyDropdownContainer" ref={dropdownRef}>
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
