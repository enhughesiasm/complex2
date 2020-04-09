export {};
declare global {
	interface Array<T> {
		random(): T;
	}
}

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
if (!Array.prototype.random) {
	Array.prototype.random = function <T>(): T {
		return this[Math.floor(Math.random() * this.length)];
	};
}
