require("../../../node_modules/bulma/sass/utilities/initial-variables.sass");
require("../../../node_modules/bulma/sass/utilities/functions.sass");

// // alter bulma variables & load rest of bulma
require("./customise.scss");

// require('./bulma-slider.css');

// my responsive fixes
// require('./responsive.scss');

// app specific
require("./complex2.scss");

interface IIndexable {
	[key: string]: any;
}

const styleVariables: IIndexable = {
	primary: getComputedStyle(document.documentElement).getPropertyValue(
		"--primary"
	),
	info: getComputedStyle(document.documentElement).getPropertyValue("--info"),
	success: getComputedStyle(document.documentElement).getPropertyValue(
		"--success"
	),
	warning: getComputedStyle(document.documentElement).getPropertyValue(
		"--warning"
	),
	danger: getComputedStyle(document.documentElement).getPropertyValue(
		"--danger"
	),
	link: getComputedStyle(document.documentElement).getPropertyValue("--link"),
	linkHover: getComputedStyle(document.documentElement).getPropertyValue(
		"--link-hover"
	),
	rarity0: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity0"
	),
	rarity1: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity1"
	),
	rarity2: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity2"
	),
	rarity3: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity3"
	),
	rarity4: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity4"
	),
	rarity5: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity5"
	),
	rarity6: getComputedStyle(document.documentElement).getPropertyValue(
		"--rarity6"
	),
};

export default styleVariables;
