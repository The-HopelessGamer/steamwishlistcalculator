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
	const response = await fetch(API_PATH + "/counterRead");

	if (!response.ok) {
		return {
			ok: false,
			text: "Failed Fetching Counter",
		};
	}

	return {
		ok: true,
		data: Number(await response.text()),
	};
}