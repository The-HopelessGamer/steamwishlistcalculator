import React from "react";

type DelimitedProps = {
	elements: React.ReactNode[];
	delimiter: React.ReactNode;
};

export function Delimited(props: DelimitedProps) {
	return (
		<>
			{props.elements.map((element, index) => {
				return (
					<React.Fragment key={index}>
						{!!index && props.delimiter}
						{element}
					</React.Fragment>
				);
			})}
		</>
	);
}
