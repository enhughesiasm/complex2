import React, { useContext } from "react";
import AppContext from "../../../../../state/app_context";
import HandsTrait from "../../hands_trait";
import { useTransition, animated } from "react-spring";
import transitionConfig from "../surroundings_transitions";

const HandStorage: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	const {
		handTraits: traits,
		handSurroundings: surroundings,
	} = worldState.storage;

	const traitTransitions = useTransition(
		traits,
		(item) => item.id,
		transitionConfig
	);

	return (
		<div
			className="tile is-child box"
			style={{
				background: surroundings.backgroundImage,
				backgroundColor: surroundings.backgroundColor ?? "inherit",
				backgroundSize: surroundings.backgroundSize,
				backgroundPosition:
					surroundings.backgroundPosition ?? "initial !important",
			}}
		>
			<h3 className="subtitle has-text-weight-bold">{surroundings.name}</h3>
			<p>
				{" "}
				{worldState.storage.handTraits.length} /{" "}
				{worldState.storage.maxHandTraitSize}{" "}
			</p>
			{traitTransitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} />
				</animated.div>
			))}
		</div>
	);
};

export default HandStorage;
