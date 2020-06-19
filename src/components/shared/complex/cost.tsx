import * as React from "react";
import FontAwesome from "../font_awesome";
import AppContext from "../../../state/app_context";
import friendly_number from "./friendly_number";

interface CostProps {
	amount: number;
	style_positive?: string;
	style_negative?: string;
}

const Cost: React.FC<CostProps> = ({
	amount,
	style_negative,
	style_positive,
}) => {
	const { worldState } = React.useContext(AppContext);

	style_negative = style_negative ?? "info";
	style_positive = style_positive ?? "primary";

	return (
		<>
			{/* TK TODO - this needs a friendly number approach for higher costs */}
			<span className="has-text-weight-bold is-family-code">
				{friendly_number(amount)}
			</span>{" "}
			{}
			<FontAwesome
				icon="thumbs-up"
				size="small"
				status={worldState.favours >= amount ? style_positive : style_negative}
			/>
		</>
	);
};

export default Cost;
