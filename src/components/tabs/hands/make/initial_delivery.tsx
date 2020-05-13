import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

const InitialDelivery: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	const canAskForHelp =
		worldState.worldFlags.handDeliveredFirstBatch &&
		gameState.canVolunteerHandDeliver();

	return (
		<>
			<div className="is-divider" data-content="DELIVER" />
			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<button
							className="button is-small is-rounded is-primary"
							onClick={() => gameState.beginHandDeliverBatch()}
							disabled={!gameState.canHandDeliver()}
						>
							take batch to the shop
						</button>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<Circle
							progress={worldState.worldOperations.handDeliverBatchProgress}
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

			{canAskForHelp && worldState.worldFlags.isVolunteerHandDeliveringBatch && (
				<div className="message is-success">
					<div className="message-body">
						A friend is carrying a batch for you.
					</div>
				</div>
			)}

			{canAskForHelp && !worldState.worldFlags.isVolunteerHandDeliveringBatch && (
				<div className="message is-danger">
					<div className="message-body">
						This journey takes AGES.
						<button
							className="button is-info is-small is-rounded"
							onClick={() => gameState.beginVolunteerHandDeliverBatch()}
							disabled={!gameState.canVolunteerHandDeliver()}
						>
							ask for help
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default InitialDelivery;
