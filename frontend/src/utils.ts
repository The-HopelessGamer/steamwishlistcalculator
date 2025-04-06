import { useState, useEffect } from "react";

export function classNames(classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(" ");
}

export const enum LoadState {
	Pending,
	Loading,
	Loaded,
	Failed,
}

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(query).matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
		mediaQuery.addEventListener("change", listener);

		return () => mediaQuery.removeEventListener("change", listener);
	}, [query]);

	return matches;
}
