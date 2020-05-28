import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

// TK refactor this into many smaller components, fix UI

const InitialIngredients: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	const basicIngredientCount = worldState.inventory.getIngredientAmount(0);

	return (
		<>
			<div className="is-divider" data-content="INGREDIENTS" />

			<div className="content">
				<span
					className={
						"has-text-" + (basicIngredientCount > 0 ? "success" : "danger")
					}
				>
					You have {basicIngredientCount} basic ingredients.
				</span>
			</div>

			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<button
							className="button is-small is-rounded is-primary"
							disabled={!gameState.canGatherBasicIngredients()}
							onClick={() => gameState.gatherBasicIngredients()}
						>
							gather yourself
						</button>
					</div>
				</div>
				<div className="level-right">
					<div className="level-item">
						<Circle
							progress={
								worldState.worldOperations.gatherBasicIngredientsProgress
							}
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

			{worldState.worldFlags.manualGatherCount >= 1 &&
				worldState.worldFlags.manualGatherHelpCycles > 0 && (
					<div className="message is-success">
						<div className="message-body">
							Curious passers-by will help gather{" "}
							{worldState.worldFlags.manualGatherHelpCycles} ingredients.
						</div>
					</div>
				)}

			{worldState.worldFlags.manualGatherCount >= 1 &&
				worldState.worldFlags.manualGatherHelpCycles === 0 && (
					<div className="message is-danger">
						<div className="message-body">
							Gathering is boring.
							<button
								className="button is-info is-small is-rounded"
								onClick={() => gameState.askForHelpGatheringBasicIngredients()}
							>
								ask for help
							</button>
						</div>
					</div>
				)}
		</>
	);
};

export default InitialIngredients;
