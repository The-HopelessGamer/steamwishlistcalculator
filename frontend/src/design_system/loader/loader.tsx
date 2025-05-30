import styles from "./loader.module.css";
import { classNames } from "../../utils";

type LoaderProps = {
	color?: "white" | "black";
};

export function Loader(props: LoaderProps) {
	const color = props.color ?? "white";
	return (
		<span
			className={classNames([
				styles.loader,
				color === "white" ? styles.loaderWhite : styles.loaderBlack,
			])}
		/>
	);
}
