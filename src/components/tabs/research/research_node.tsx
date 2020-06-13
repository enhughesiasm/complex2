import React, { useContext } from "react";
import { IResearchItem } from "../../../state/research/IResearchItem";
import AppContext from "../../../state/app_context";

interface IResearchNodeProps {
	nodeData?: IResearchItem;
}

const ResearchNode: React.FC<IResearchNodeProps> = ({ nodeData }) => {
	const { worldState, gameState } = useContext(AppContext);

	let background = "";

	if (nodeData) {
		const node = worldState.research.getItem(nodeData?.research_id);

		background = node.completeClaimed
			? "has-background-success"
			: node.prerequisitesMet(worldState)
			? "has-background-primary"
			: "has-background-danger";

		if (worldState.research.currentId === node.research_id) {
			background = "has-background-info";
		}
	}

	return (
		<h2
			className={"subtitle has-text-white " + background}
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
		</h2>
	);
};

export default ResearchNode;
