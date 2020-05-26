import React, { useContext } from "react";
import { ITarget } from "../../../state/targets/targets";
import AppContext from "../../../state/app_context";

interface ITargetProps {
	target: ITarget;
}

const Target: React.FC<ITargetProps> = ({ target }) => {
	const { worldState } = useContext(AppContext);

	const p = target.progressTowardsCompletion(worldState);
	const max = p + target.distanceFromCompletion(worldState);
	const percent = Math.floor((p * 100) / max);

	return (
		<div className="tile is-child is-4">
			<div className="card" style={{ margin: "0 .5rem" }}>
				<div className="card-header has-background-primary">
					<p className="card-header-title">{target.name}</p>
				</div>
				<div className="card-content">
					<p className="">{target.description}</p>
				</div>
				<div
					className="card-footer has-text-centered"
					style={{
						alignItems: "center",
						padding: ".5rem .8rem",
					}}
				>
					<p className="smallPrint">
						{target.targetValue} {target.targetUnits}{" "}
					</p>
					{!target.completed && (
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
					{target.completed && !target.claimed && (
						<button
							className="button is-success is-rounded"
							onClick={() => target.claim(worldState)}
						>
							Claim reward!
						</button>
					)}
					{target.completed && target.claimed && (
						<div className="notification is-success is-light">
							<strong className="is-size-7">Reward claimed.</strong>
							<div>{target.claimedMessage}</div>
						</div>
					)}
					{!target.completed && target.claimed && <p>Uh-oh, a bug occurred.</p>}
				</div>
			</div>
		</div>
	);
};

export default Target;
