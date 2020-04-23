import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import { ingredientLevel } from "../../../../state/data/ingredient_levels";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

const InitialProduction: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<>
			<div className="is-divider" data-content="MAKE" />
			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<button
							className="button is-small is-rounded is-primary"
							onClick={() => gameState.handMixIngredients()}
							disabled={gameState.isHandMixingIngredients()}
						>
							mix ingredients
						</button>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<Circle
							progress={worldState.worldOperations.handMixIngredientsProgress}
							animate={true}
							animationDuration={"10ms"}
							showPercentage={false}
							progressColor={styleVariables.info}
							size="50"
							roundedStroke={true}
							lineWidth="50"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default InitialProduction;
