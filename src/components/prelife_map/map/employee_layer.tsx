import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { Layer, Circle } from "react-konva";
import Konva from "konva";
import { JobTypes } from "../../../state/jobs/job_types";

// TK: review these
const employeeColours = {
	DEFAULT: Konva.Util.getRandomColor(),
	DELIVERY: "red",
	GATHERING: "darkgreen",
	MIXING: "black",
	EXPLORING: "brown",
};

function getColour(jobType: JobTypes): string {
	switch (jobType) {
		case JobTypes.Delivering:
			return employeeColours.DELIVERY;
		case JobTypes.Gathering:
			return employeeColours.GATHERING;
		case JobTypes.Mixing:
			return employeeColours.MIXING;
		case JobTypes.Exploring:
			return employeeColours.EXPLORING;
		default:
			return employeeColours.DEFAULT;
	}
}

const EmployeeLayer: React.FC = () => {
	const { worldState } = useContext(AppContext);

	// const { prelifeMap } = worldState;

	return (
		<Layer>
			{worldState.employees.all.map((e) => {
				if (!e.currentTile) {
					return <></>;
				}

				return (
					<Circle
						key={e.id}
						x={e.mapCoOrds[0]}
						y={e.mapCoOrds[1]}
						fill={getColour(e.assignedJob)}
						radius={2}
					/>
				);
			})}
		</Layer>
	);
};

export default EmployeeLayer;
