import type { common } from "protos";

const API_PATH = "/api";

type ServiceSuccess<T> = {
	ok: true;
	data: T;
};

type ServiceError = {
	ok: false;
	text: string;
}

type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;

export async function counterRead(): Promise<ServiceResponse<number>> {
	try {
		const response = await fetch(API_PATH + "/counterRead");

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
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


export async function ip2Country(): Promise<ServiceResponse<string>> {
	try {
		const response = await fetch(API_PATH + "/ip2Country");

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
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


export async function counterUpdate(): Promise<ServiceResponse<undefined>> {
	try {
		const response = await fetch(API_PATH + "/counterUpdate", {
			method: "POST",
		});

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
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

export async function resolveVanityUrl(vanityUrl: string): Promise<ServiceResponse<string>> {
	try {
		const response = await fetch(API_PATH + "/resolveVanityUrl?" + new URLSearchParams({
			vanityUrl,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
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


export async function getProfileName(steamId: string): Promise<ServiceResponse<string>> {
	try {
		const response = await fetch(API_PATH + "/getProfileName?" + new URLSearchParams({
			steamId,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
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


export async function getWishlist(steamId: string, countryCode: string): Promise<ServiceResponse<common.StoreItem[]>> {
	try {
		const response = await fetch(API_PATH + "/wishlist?" + new URLSearchParams({
			steamId,
			countryCode,
		}));

		if (!response.ok) {
			return {
				ok: false,
				text: await response.text(),
			};
		}

		return {
			ok: true,
			data: (await response.json()) as common.StoreItem[],
		};

	} catch {
		return {
			ok: false,
			text: "Failed fetching wishlist",
		};
	}
}