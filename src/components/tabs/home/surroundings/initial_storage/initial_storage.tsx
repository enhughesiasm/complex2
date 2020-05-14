import React, { useContext } from "react";
import AppContext from "../../../../../state/app_context";
import HandsTrait from "../../hands_trait";
import { useTransition, animated } from "react-spring";
import transitionConfig from "../surroundings_transitions";
import Cost from "../../../../shared/complex/cost";

const InitialStorage: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	const {
		initialStorageTraits: traits,
		initialStorage: surroundings,
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
				{worldState.storage.initialStorageTraits.length} /{" "}
				{worldState.storage.currentMaxInitialStorageSize}{" "}
				{worldState.storage.currentMaxInitialStorageSize <
					worldState.storage.absoluteMaxInitialStorageSize && (
					<button
						className="button is-small is-rounded is-dark"
						disabled={!gameState.canExpandInitialStorage()}
						onClick={() => gameState.expandInitialStorage()}
					>
						make more room{" - "}
						<Cost amount={gameState.getCost_ExpandInitialStorage()} />
					</button>
				)}
			</p>
			{traitTransitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} />
				</animated.div>
			))}
		</div>
	);
};

export default InitialStorage;
