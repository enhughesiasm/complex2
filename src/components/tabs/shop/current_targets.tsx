import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import Enumerable from "linq";
import Circle from "react-circle";
import styleVariables from "../../../resources/styles/styles";

const targetsToShow = 3; // TK move this

const CurrentTargets: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const nextTargets = Enumerable.from(worldState.targets)
		.orderByDescending((a) => a.distanceFromCompletion(worldState))
		.take(targetsToShow)
		.toArray();

	return (
		<>
			{nextTargets.length > 0 && (
				<>
					<h4 className="subtitle">Current Targets:</h4>
					{/* TK cool transitions for when they overtake each other */}
					<div className="tile is-parent">
						{nextTargets.map((t) => {
							const p = t.progressTowardsCompletion(worldState);
							const max = p + t.distanceFromCompletion(worldState);
							const percent = Math.floor((p * 100) / max);

							return (
								<div className="card">
									<div className="card-header has-background-primary">
										<p className="card-header-title">{t.name}</p>
									</div>
									<div className="card-content">
										<p className="">{t.description}</p>
									</div>
									<div
										className="card-footer has-text-centered"
										style={{ alignItems: "center", padding: ".5rem .8rem" }}
									>
										<p className="smallPrint">
											{t.targetValue} {t.targetUnits}{" "}
										</p>
										{/* <Circle
											animate={true}
											animationDuration="30ms"
											responsive={false}
											size="70"
											lineWidth="50"
											progress={p}
											progressColor={
												percent < 25
													? styleVariables.danger
													: percent < 90
													? styleVariables.info
													: styleVariables.success
											}
											roundedStroke={true}
											showPercentage={false}
											showPercentageSymbol={false}
										/> */}
										{!t.completed && (
											<progress
												className={
													"progress " +
													(percent < 25
														? "is-danger"
														: percent < 90
														? "is-info"
														: "is-success")
												}
												value={p}
												max={max}
												style={{ margin: "0 .7rem" }}
											>
												{p}%
											</progress>
										)}
										{t.completed && !t.claimed && (
											<button
												className="button is-success is-rounded"
												onClick={() => t.claim(worldState)}
											>
												Claim reward!
											</button>
										)}
										{t.completed && t.claimed && <p>Reward claimed.</p>}
										{!t.completed && t.claimed && <p>Uh-oh, a bug occurred.</p>}
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default CurrentTargets;
