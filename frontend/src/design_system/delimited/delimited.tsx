import React from "react";

type DelimitedProps = {
	elements: React.ReactNode[],
	delimiter: string
};

export function Delimited({ elements, delimiter }: DelimitedProps) {
	return (
		<>
			{elements.map((element, index) => {
				return (
					<React.Fragment key={index}>
						{ !!index && delimiter }
						{ element }
					</React.Fragment>
				);
			})}
		</>
	);
}