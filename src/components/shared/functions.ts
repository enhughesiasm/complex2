export function create_guid() {
	var dt = new Date().getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
		c
	) {
		var r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
}

export enum RandomNumberWeighting {
	None = 1,
	Slightly_PreferLowNumbers = 1.5,
	PreferLowNumbers = 2,
	Really_PreferLowNumbers = 4,
	Massively_PreferLowNumbers = 6,
	PreferHighNumbers = 0.5,
	Really_PreferHighNumbers = 0.3,
}

export function getWeightedRandomInteger(
	min: number,
	max: number,
	weighting: RandomNumberWeighting
): number {
	return Math.floor(min + (max + 1 - min) * Math.pow(Math.random(), weighting));
}

export function getHashCode(str: string) {
	var hash = 0,
		i,
		chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export function clamp(number: number, min: number, max: number): number {
	return Math.max(min, Math.min(number, max));
}

// export function useTraceUpdate(props: any) {
// 	const prev = useRef(props);
// 	useEffect(() => {
// 		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
// 			if (prev.current[k] !== v) {
// 				ps[k] = [prev.current[k], v];
// 			}
// 			return ps;
// 		}, {});
// 		if (Object.keys(changedProps).length > 0) {
// 			console.log('Changed props:', changedProps);
// 		}
// 		prev.current = props;
// 	});
// }

// export function orderByMultipleProperties(prop : any) {
// 	var args = Array.prototype.slice.call(arguments, 1);
// 	return function (a : any, b : any) {
// 		let equality = 0;
// 		if (Number.isInteger(a[prop]) && Number.isInteger(b[prop])) {
// 			equality = a[prop] - b[prop];
// 		} else {
// 			equality = (a[prop] || '')
// 				.toString()
// 				.localeCompare((b[prop] || '').toString());
// 		}
// 		if (equality === 0 && arguments.length > 1) {
// 			return orderByMultipleProperties.apply(null, args)(a, b);
// 		}
// 		return equality;
// 	};
// }

// export function JSON_to_URLEncoded(element, key, list) {
// 	var list = list || [];
// 	if (typeof element == 'object') {
// 		for (var idx in element)
// 			JSON_to_URLEncoded(
// 				element[idx],
// 				key ? key + '[' + idx + ']' : idx,
// 				list
// 			);
// 	} else {
// 		list.push(key + '=' + encodeURIComponent(element));
// 	}
// 	return list.join('&');
// }

// export function groupBy(array, fnSelectKey) {
// 	return array.reduce(
// 		(r, v, i, a, k = fnSelectKey(v)) => ((r[k] || (r[k] = [])).push(v), r),
// 		{}
// 	);
// }

declare global {
	interface Window {
		gtag: any;
	}
}

export function submitToAnalytics(
	action: string,
	category: string,
	label: string,
	value: number
) {
	if (window.gtag) {
		window.gtag("event", action, {
			event_category: category,
			event_label: label ?? "",
			value: value ?? 0,
		});
	}
}

export function lerp(
	value: number,
	low1: number,
	high1: number,
	low2: number,
	high2: number
): number {
	return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export const addBodyClass = (className: string) =>
	document.body.classList.add(className);
export const removeBodyClass = (className: string) =>
	document.body.classList.remove(className);
export const hasBodyClass = (className: string) =>
	document.body.classList.contains(className);

export function chooseRandomElement<T>(arr: Array<T>): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @param toNearest Integer value to round to nearest, e.g. 1000 to round to nearest 1000
 */
export function roundToNearest(value: number, toNearest: number): number {
	return Math.ceil(value / toNearest) * toNearest;
}

/**
 * a wrapper for .find() for those cases when I'm searching through an array I *know* to be populated with an object I need to find
 */
export function ensure<T>(
	argument: T | undefined | null,
	message: string = "This value was promised to be there."
): T {
	if (argument === undefined || argument === null) {
		throw new TypeError(message);
	}

	return argument;
}
