import "./wishlist.css";
import { useParams } from "react-router";

export function Wishlist() {
	const { wishlistId } = useParams();

	return <span>Wishlist</span>;
}
