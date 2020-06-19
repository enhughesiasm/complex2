import React, { useContext, useState, useEffect } from "react";
import { IResearchItem } from "../../../state/research/IResearchItem";
import AppContext from "../../../state/app_context";
import Cost from "../../shared/complex/cost";

interface IResearchNodeProps {
	nodeData?: IResearchItem;
}

const ResearchNode: React.FC<IResearchNodeProps> = ({ nodeData }) => {
	const { worldState, gameState } = useContext(AppContext);

	const { research } = worldState;

	const [remainingCost, setRemainingCost] = useState(
		nodeData?.costRemaining ?? nodeData?.cost ?? 0
	);

	const item = research.getItem(nodeData?.research_id ?? "");

	useEffect(() => {
		setRemainingCost(item.costRemaining ?? item.cost);
	}, [item, item.costRemaining]);

	let background = "";

	background = item.completed
		? "has-background-success-light"
		: item.prerequisitesMet(worldState)
		? "has-background-primary-light"
		: "has-background-danger-light";

	const foreground =
		background === "has-background-light" ? "has-text-dark" : "has-text-dark";

	if (worldState.research.currentId === item.research_id) {
		background = "has-background-info-light";
	}

	return (
		<h2
			className={"subtitle " + foreground + " " + background}
			style={{
				border: "1px solid black",
				background: "white",
				padding: "0 .3rem",
				textAlign: "center",
				fontSize: "90%",
			}}
			onClick={() => {
				gameState.setResearch(nodeData?.research_id);
			}}
		>
			{nodeData?.name}
			{remainingCost > 0 && (
				<p>
					<Cost
						amount={remainingCost}
						style_negative="dark"
						style_positive="success"
					/>
				</p>
			)}
		</h2>
	);
};

export default ResearchNode;
