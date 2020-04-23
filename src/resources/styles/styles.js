require("../../../node_modules/bulma/sass/utilities/initial-variables.sass");
require("../../../node_modules/bulma/sass/utilities/functions.sass");

// // alter bulma variables & load rest of bulma
require("./customise.scss");

// require('./bulma-slider.css');

// my responsive fixes
// require('./responsive.scss');

// app specific
require("./complex2.scss");

const styleVariables = {
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
};

export default styleVariables;
