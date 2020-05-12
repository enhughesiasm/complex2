import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

const InitialDelivery: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

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
		</>
	);
};

export default InitialDelivery;
