import "./dropdown.css";

export type Option = {
	value: string;
	label: string;
};

export type DropdownProps = {
	onChange: (option: string) => void;
	options: Option[];
	value: string;
};

export function Dropdown(props: DropdownProps) {
	return (
		<select
			onChange={(event) => props.onChange(event.target.value)}
			value={props.value}
		>
			{props.options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
