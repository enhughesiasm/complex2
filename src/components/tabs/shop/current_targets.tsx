import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import Enumerable from "linq";
import { targetsToShow } from "../../../state/constants";
import Target from "./target";

const CurrentTargets: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const nextTargets = Enumerable.from(
		worldState.targets.filter((a) => !a.completed)
	)
		.orderByDescending((a) => a.distanceFromCompletion(worldState))
		.take(targetsToShow)
		.toArray();

	const completedTargets = Enumerable.from(
		worldState.targets.filter((a) => a.completed)
	)
		.orderByDescending((a) => a.timeCompleted)
		.toArray();

	return (
		<>
			{nextTargets.length > 0 && (
				<>
					<h4 className="subtitle">Current Targets:</h4>
					{/* TK cool transitions for when they overtake each other */}
					<div className="tile is-parent wrap-child-tiles">
						{nextTargets.map((t) => (
							<Target target={t} />
						))}
					</div>
				</>
			)}
			{completedTargets.length > 0 && (
				<>
					<h4 className="subtitle">Completed Targets:</h4>
					<div className="tile is-parent wrap-child-tiles">
						{completedTargets.map((t) => (
							<Target target={t} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default CurrentTargets;
