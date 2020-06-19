import { useState, useLayoutEffect } from "react";
import useWindowDimensions from "./use_window_dimensions";

const emptyRect = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	width: 0,
	height: 0,
};

export function useDimensions(ref) {
	const [dimensions, setDimensions] = useState(emptyRect);

	const windowDimensions = useWindowDimensions();

	useLayoutEffect(() => {
		setDimensions(ref?.current?.getBoundingClientRect().toJSON());
	}, [windowDimensions.width, ref, ref.current]);
	return { ref: ref, dimensions: dimensions ?? emptyRect };
}
