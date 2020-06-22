const storageTrait_transitionConfig = {
	config: { mass: 3, friction: 30 },
	from: { transform: "translate3d(-60px,0,0)" },
	enter: {
		transform: "translate3d(0,0px,0)",
		opacity: 1,
		height: "50px",
	},
	leave: {
		transform: "translate3d(160px,0,0)",
		height: "0px",
		opacity: 0,
	},
};

export default storageTrait_transitionConfig;
