import styles from "./content_box.module.css";

type ContentBoxProps = {
	color: "white" | "grey";
	children: React.ReactNode;
};

export function ContentBox(props: ContentBoxProps) {
	return (
		<div
			className={[
				styles.contentBox,
				props.color === "white"
					? styles.contentBoxWhite
					: styles.contentBoxGrey,
			].join(" ")}
		>
			{props.children}
		</div>
	);
}
