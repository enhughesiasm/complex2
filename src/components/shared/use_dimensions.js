import { useState, useLayoutEffect } from "react";
import useWindowDimensions from "./use_window_dimensions";

export function useDimensions(ref) {
	const [dimensions, setDimensions] = useState({});

	const windowDimensions = useWindowDimensions();

	useLayoutEffect(() => {
		setDimensions(ref.current.getBoundingClientRect().toJSON());
	}, [windowDimensions.width, ref]);
	return { ref: ref, dimensions: dimensions };
}
