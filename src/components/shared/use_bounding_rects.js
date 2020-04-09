import { useLayoutEffect, useState } from 'react';

const emptyRect = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	width: 0,
	height: 0
};

const getRects = el => {
	if (!el)
		return {
			rect: undefined,
			parentRect: undefined
		};

	const parentNode = el.parentNode;

	const rect = el.getBoundingClientRect
		? el.getBoundingClientRect()
		: emptyRect;

	const parentRect =
		parentNode && parentNode.getBoundingClientRect
			? parentNode.getBoundingClientRect()
			: emptyRect;

	return { rect, parentRect };
};

export const useBoundingRects = ref => {
	let [{ rect, parentRect }, setRects] = useState(getRects(ref.current));

	const handleResize = () => {
		if (ref && ref.current) {
			setRects(getRects(ref.current));
		}
	};

	useLayoutEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	return [rect, parentRect];
};
