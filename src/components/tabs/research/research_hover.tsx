import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../state/app_context";
import { IResearchItem } from "../../../state/research/IResearchItem";

const ResearchHover: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { research } = worldState;

	const [hover, setHover] = useState<IResearchItem>();

	useEffect(() => {
		if (research.hoverId) {
			setHover(research.getItem(research.hoverId));
		} else {
			setHover(undefined);
		}
	}, [research.hoverId]);

	return (
		<>
			{hover && (
				<>
					<p>{hover.description}</p>

					<p className="has-text-weight-bold mt-3">
						Difficulty: {hover.researchDifficulty}
					</p>

					<p>{hover.progressPercent.toFixed(1)}%</p>
				</>
			)}
		</>
	);
};

export default ResearchHover;
