import "./header.css";
import { Link } from "react-router";

export function Header() {
	return (
		<div className="header">
			<Link to="/">
				<b className="title">Steam Wishlist Calculator</b>
			</Link>
			<span>Menu</span>
		</div>
	);
}
