import { useParams } from "react-router";
import { Loading } from "./loading/loading";
import { useState, useEffect } from "react";
import {
	resolveVanityUrl,
	getProfileName,
	getWishlist,
} from "../../backend_api";
import { CalculateError } from "./calculate_error/calculate_error";
import { LoadState } from "../../utils";
import { Table } from "./table/table";
import { WishlistItem } from "../../wishlist_item";

function isSteamId(steamIdOrVanityUrl: string) {
	return (
		Number.isInteger(Number(steamIdOrVanityUrl)) &&
		steamIdOrVanityUrl.length === 17
	);
}

type WishlistProps = {
	countryCodeLoading: LoadState;
	countryCode: string;
	setIsAppScrollable: (value: boolean) => void;
};

export function Wishlist(props: WishlistProps) {
	const [resolveVanityUrlLoading, setResolveVanityUrlLoading] = useState(
		LoadState.Pending
	);
	const [wishlistLoading, setWishlistLoading] = useState(LoadState.Pending);
	const [profileNameLoading, setProfileNameLoading] = useState(
		LoadState.Pending
	);
	const [steamId, setSteamId] = useState(useParams().wishlistId ?? "");
	const [error, setError] = useState<string | undefined>(undefined);
	const [profileName, setProfileName] = useState("");
	const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

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

		if (
			isSteamId(steamId) &&
			profileNameLoading === LoadState.Pending &&
			wishlistLoading === LoadState.Pending &&
			(props.countryCodeLoading === LoadState.Loaded ||
				props.countryCodeLoading === LoadState.Failed)
		) {
			setProfileNameLoading(LoadState.Loading);
			getProfileName(steamId).then((service_response) => {
				if (service_response.ok) {
					setProfileName(service_response.data);
					setProfileNameLoading(LoadState.Loaded);
				} else {
					setError(service_response.text);
					setProfileNameLoading(LoadState.Failed);
				}
			});

			setWishlistLoading(LoadState.Loading);
			getWishlist(steamId, props.countryCode).then((service_response) => {
				if (service_response.ok) {
					setWishlist(service_response.data);
					setWishlistLoading(LoadState.Loaded);
				} else {
					setError(service_response.text);
					setWishlistLoading(LoadState.Failed);
				}
			});
		}
	}, [
		steamId,
		props.countryCode,
		resolveVanityUrlLoading,
		profileNameLoading,
		wishlistLoading,
		props.countryCodeLoading,
	]);

	if (error) {
		return <CalculateError text={error} />;
	}

	if (
		profileNameLoading !== LoadState.Loaded ||
		wishlistLoading !== LoadState.Loaded
	) {
		return <Loading />;
	}

	return (
		<Table
			steamId={steamId}
			profileName={profileName}
			wishlist={wishlist}
			setIsAppScrollable={props.setIsAppScrollable}
		/>
	);
}
