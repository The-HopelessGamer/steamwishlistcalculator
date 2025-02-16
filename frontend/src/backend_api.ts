const API_PATH = "/api";

type ServiceSuccess<T> = {
	ok: true;
	data: T;
};

type ServiceError = {
	ok: false;
	text: string;
}

type ServiceResposne<T> = ServiceSuccess<T> | ServiceError;

export async function counterRead(): Promise<ServiceResposne<number>> {
	try {
		const response = await fetch(API_PATH + "/counterRead");

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: Number(await response.text()),
		};

	} catch {
		return {
			ok: false,
			text: "Failed fetching counter",
		};
	}
}


export async function ip2Country(): Promise<ServiceResposne<string>> {
	try {
		const response = await fetch(API_PATH + "/ip2Country");

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: await response.text(),
		};

	} catch {
		return {
			ok: false,
			text: "Failed fetching country code",
		};
	}
}


export async function counterUpdate(): Promise<ServiceResposne<undefined>> {
	try {
		const response = await fetch(API_PATH + "/counterUpdate", {
			method: "POST",
		});

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: undefined,
		};

	} catch {
		return {
			ok: false,
			text: "Failed updating counter",
		};
	}
}

export async function resolveVanityUrl(vanityUrl: string): Promise<ServiceResposne<string>> {
	try {
		const response = await fetch(API_PATH + "/resolveVanityUrl?" + new URLSearchParams({
			vanityUrl,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: await response.text(),
		};

	} catch {
		return {
			ok: false,
			text: "Failed resolving vanity url",
		};
	}
}


export async function getProfileName(steamId: string): Promise<ServiceResposne<string>> {
	try {
		const response = await fetch(API_PATH + "/getProfileName?" + new URLSearchParams({
			steamId,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: await response.text(),
		};

	} catch {
		return {
			ok: false,
			text: "Failed fetching profile name",
		};
	}
}


export async function getWishlist(wishlist: string, countryCode: string): Promise<ServiceResposne<object>> {
	try {
		const response = await fetch(API_PATH + "/wishlist?" + new URLSearchParams({
			wishlist,
			countryCode,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: response.status.toString(),
			};
		}

		return {
			ok: true,
			data: JSON.parse(await response.json()),
		};

	} catch {
		return {
			ok: false,
			text: "Failed fetching wishlist",
		};
	}
}