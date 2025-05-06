import { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils";
import "./currency_dropdown.css";
import { DropdownProps, Dropdown } from "../../design_system/dropdown/dropdown";
import CaretIcon from "../../design_system/icons/caret-down-solid.svg?react";

export function CurrencyDropdown(props: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedOption = props.options.find((opt) => opt.value === props.value);

	const filteredOptions = props.options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
				<span>{selectedOption?.label || "Select Currency"}</span>
				<CaretIcon
					className={classNames([
						"currencyDropdownArrow",
						isOpen && "currencyDropdownArrowUp",
					])}
				/>
			</div>

			{isOpen && (
				<div className="currencyDropdownMenu">
					<div className="currencyDropdownSearchContainer">
						<input
							type="text"
							className="currencyDropdownSearch"
							placeholder="Search Currency"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							autoFocus
						/>
					</div>
					{filteredOptions.map((option) => (
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
								setSearchTerm("");
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
