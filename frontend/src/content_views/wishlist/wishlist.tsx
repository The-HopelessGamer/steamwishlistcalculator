import { useParams } from "react-router";
import { Loader } from "../../design_system/loader/loader";

export function Wishlist() {
	const { wishlistId } = useParams();

	return <Loader />;
}
