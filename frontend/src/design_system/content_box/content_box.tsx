import "./content_box.css";

type ContentBoxProps = {
	color: "white" | "grey";
	children: React.ReactNode;
};

export function ContentBox({ color, children }: ContentBoxProps) {
	return (
		<div
			className={[
				"contentBox",
				color === "white" ? "contentBoxWhite" : "contentBoxGrey",
			].join(" ")}
		>
			{children}
		</div>
	);
}
