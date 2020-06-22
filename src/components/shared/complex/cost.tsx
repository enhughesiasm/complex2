import * as React from "react";
import FontAwesome from "../font_awesome";
import AppContext from "../../../state/app_context";
import BigNumber from "./big_number";

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
			<BigNumber amount={amount} />
			<FontAwesome
				icon="thumbs-up"
				size="small"
				status={worldState.favours >= amount ? style_positive : style_negative}
			/>
		</>
	);
};

export default Cost;
