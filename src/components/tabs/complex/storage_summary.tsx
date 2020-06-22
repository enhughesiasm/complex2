import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import BigNumber from "../../shared/complex/big_number";
import HandsTrait from "../home/hands_trait";
import { useTransition, animated } from "react-spring";
import storageTrait_transitionConfig from "./storage_trait_transition_config";

const StorageSummary = () => {
	const { worldState, uiState } = useContext(AppContext);

	const traitTransitions = useTransition(
		uiState.traitsSummaryTraits,
		(item) => item.id,
		storageTrait_transitionConfig
	);

	return (
		<div>
			<BigNumber amount={worldState.storage.getTotalStored()} /> /{" "}
			<BigNumber amount={worldState.storage.getCapacity()} />
			{traitTransitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} />
				</animated.div>
			))}
		</div>
	);
};

export default StorageSummary;
