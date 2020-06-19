import React, { useContext, useRef } from "react";
import Tree from "react-d3-tree";
import ResearchNode from "./research_node";
import styleVariables from "../../../resources/styles/styles";
import { IResearchItem } from "../../../state/research/IResearchItem";

import AppContext from "../../../state/app_context";
import { useDimensions } from "../../shared/use_dimensions";

interface IResearchTreeProps {
	parentRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const ResearchTree: React.FC<IResearchTreeProps> = ({ parentRef }) => {
	const { worldState } = useContext(AppContext);

	const { research } = worldState;

	const { dimensions } = useDimensions(parentRef);

	// boy do I hate this
	const svgElement = parentRef?.current?.getElementsByTagName("svg")[0];

	const depthHeight = 110;

	if (svgElement && svgElement.style) {
		svgElement.style.height = research.getMaxDepth() * depthHeight + "px";
	}

	return (
		<Tree
			data={research.tree}
			nodeSvgShape={{
				shape: "rect",
				shapeProps: {
					width: 0,
					height: 20,
					x: 0,
					y: 0,
				},
			}}
			transitionDuration={0}
			zoomable={false}
			zoom={1}
			depthFactor={depthHeight}
			collapsible={false}
			orientation={"vertical"}
			translate={{
				x: dimensions.width / 2,
				y: 20,
			}}
			nodeSize={{
				x: dimensions.width / 6,
				y: 30,
			}}
			allowForeignObjects
			nodeLabelComponent={{
				render: <ResearchNode />,
				foreignObjectWrapper: {
					y: 0,
					x: -50,
					height: 100,
				},
			}}
			onMouseOver={(node) =>
				worldState.research.setHover(node as IResearchItem)
			}
			styles={{
				links: {
					stroke: styleVariables.primary,
					strokeWidth: 4,
				},
			}}
		/>
	);
};

export default ResearchTree;
