export function classNames(classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(" ");
}

export const enum LoadState {
	Pending,
	Loading,
	Loaded,
	Failed,
};