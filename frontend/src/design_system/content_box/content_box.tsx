import "./content_box.css";

type ContentBoxProps = {
	color: "white" | "grey";
	children: React.ReactNode;
};

export function ContentBox(props: ContentBoxProps) {
	return (
		<div
			className={[
				"contentBox",
				props.color === "white" ? "contentBoxWhite" : "contentBoxGrey",
			].join(" ")}
		>
			{props.children}
		</div>
	);
}
