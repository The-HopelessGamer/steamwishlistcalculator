import "./wishlist.css";
import { useParams } from "react-router";
import { Loading } from "./loading/loading";
import { useState, useEffect } from "react";
import { resolveVanityUrl } from "../../backend_api";
import { CalculateError } from "./calculate_error/calculate_error";
import { LoadState } from "../../utils";

function isSteamId(steamIdOrVanityUrl: string) {
	return (
		Number.isInteger(Number(steamIdOrVanityUrl)) &&
		steamIdOrVanityUrl.length === 17
	);
}

type WishlistProps = {
	countryCodeLoading: LoadState;
	countryCode: string;
};

export function Wishlist(props: WishlistProps) {
	const [resolveVanityUrlLoading, setResolveVanityUrlLoading] = useState(
		LoadState.Pending
	);
	const [steamId, setSteamId] = useState(useParams().wishlistId ?? "");
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (steamId === "") {
			setError("No steam ID Provided");
			return;
		}

		if (!isSteamId(steamId) && resolveVanityUrlLoading === LoadState.Pending) {
			setResolveVanityUrlLoading(LoadState.Loading);
			resolveVanityUrl(steamId).then((service_response) => {
				if (service_response.ok) {
					setSteamId(service_response.data);
					setResolveVanityUrlLoading(LoadState.Loaded);
				} else {
					setError(service_response.text);
					setResolveVanityUrlLoading(LoadState.Failed);
				}
			});
		}
	}, [steamId, resolveVanityUrlLoading]);

	if (error) {
		return <CalculateError text={error} />;
	}

	if (
		props.countryCodeLoading === LoadState.Loading ||
		resolveVanityUrlLoading === LoadState.Loading
	) {
		return <Loading />;
	}

	return <span>Wishlist</span>;
}
