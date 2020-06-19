import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../state/app_context";
import { IResearchItem } from "../../../state/research/IResearchItem";
import Cost from "../../shared/complex/cost";

const ResearchHover: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { research } = worldState;

	const { hoverId } = research;

	const [hover, setHover] = useState<IResearchItem>();

	useEffect(() => {
		if (hoverId) {
			setHover(research.getItem(hoverId));
		} else {
			setHover(undefined);
		}
	}, [hoverId, research]);

	return (
		<div
			className="tile is-child is-2 box has-background-primary has-text-white"
			style={{ maxHeight: "40vh", position: "sticky", top: "2rem" }}
		>
			{hover && (
				<>
					<p className="has-text-weight-bold is-size-4 has-text-centered has-background-light has-text-primary">
						{hover.name}
					</p>
					<p className="has-text-centered mt-1">{hover.description}</p>

					<p className="has-text-weight-bold mt-3 has-text-centered is-size-6">
						Difficulty: {hover.researchDifficulty}
					</p>

					<p className="has-text-centered is-size-7">
						{hover.costRemaining !== 0 && (
							<>
								<Cost
									amount={hover.costRemaining ?? hover.cost}
									style_positive="success"
									style_negative="danger"
								/>
								<span className="ml-1">remaining to pay</span>
							</>
						)}
						{hover.costRemaining === 0 && <>Paid.</>}
					</p>
					<p className="has-text-centered mt-3">
						<progress
							className="progress is-success"
							max={100}
							value={hover.progressPercent.toFixed(1)}
						>
							{hover.progressPercent.toFixed(1)}%
						</progress>
					</p>
				</>
			)}
		</div>
	);
};

export default ResearchHover;
