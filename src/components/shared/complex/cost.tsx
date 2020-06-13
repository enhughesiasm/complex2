import * as React from "react";
import FontAwesome from "../font_awesome";
import AppContext from "../../../state/app_context";

interface CostProps {
	amount: number;
}

const Cost: React.FC<CostProps> = ({ amount }) => {
	const { worldState } = React.useContext(AppContext);

	return (
		<>
			{/* TK TODO - this needs a friendly number approach for higher costs */}
			<span className="has-text-weight-bold is-family-code">{amount}</span> {}
			<FontAwesome
				icon="thumbs-up"
				size="small"
				status={worldState.favours >= amount ? "primary" : "info"}
			/>
		</>
	);
};

export default Cost;
