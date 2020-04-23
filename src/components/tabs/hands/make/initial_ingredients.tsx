import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import { ingredientLevel } from "../../../../state/data/ingredient_levels";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

// TK refactor this into many smaller components, fix UI

const InitialIngredients: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<>
			<div className="is-divider" data-content="INGREDIENTS" />
			{worldState.inventory.getTotalIngredientCount() == 0 && (
				<span className="has-text-danger">You have no ingredients.</span>
			)}

			<div className="content">
				<div className="tags">
					{Object.keys(ingredientLevel).map((il) => {
						const amount = worldState.inventory.ingredients.get(il) || 0;
						if (amount <= 0) return <></>;
						return (
							<div key={il}>
								<span className="tag is-info">{il}</span>
								<span className="tag is-success">{amount}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<button
							className="button is-small is-rounded is-primary"
							disabled={gameState.isGatheringBasicIngredients()}
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
