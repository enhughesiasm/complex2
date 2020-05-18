import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { useTransition, animated } from "react-spring";

const EmployeesTab: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	// const surroundingsTransition = useTransition(
	// 	gameState.areSurroundingsUnlocked(),
	// 	null,
	// 	{
	// 		from: { opacity: 0 },
	// 		enter: { opacity: 1 },
	// 		leave: { opacity: 0 },
	// 	}

	// );

	return <>EMPLOYEES</>;
};

export default EmployeesTab;
