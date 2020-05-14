import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import { ingredientLevel } from "../../../../state/data/ingredient_levels";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

const InitialProduction: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	const canAskForHelp = worldState.totalTraitsProduced > 2;

	return (
		<>
			<div className="is-divider" data-content="MAKE" />
			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<button
							className="button is-small is-rounded is-primary"
							onClick={() => gameState.handMixIngredients()}
							disabled={!gameState.canHandMixIngredients()}
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

			{ canAskForHelp &&
				worldState.worldFlags.initialProductionHelpCycles > 0 && (
					<div className="message is-success">
						<div className="message-body">
							A friend will help mix{" "}
							{worldState.worldFlags.initialProductionHelpCycles} ingredients.
						</div>
					</div>
				)}

			{ canAskForHelp  &&
				worldState.worldFlags.initialProductionHelpCycles === 0 && (
					<div className="message is-danger">
						<div className="message-body">
							Mixing is tedious.
							<button
								className="button is-info is-small is-rounded"
								onClick={() => gameState.askForHelpMixingBasicIngredients()}
							>ask for help
							</button>
						</div>
					</div>
				)}
		</>
	);
};

export default InitialProduction;
