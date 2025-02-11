import "./loader.css";
import { classNames } from "../../utils";

type LoaderProps = {
	color?: "white" | "black";
};

export function Loader(props: LoaderProps) {
	const color = props.color ?? "white";
	return (
		<span
			className={classNames([
				"loader",
				color === "white" ? "loaderWhite" : "loaderBlack",
			])}
		/>
	);
}
