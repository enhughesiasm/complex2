import React from "react";
import friendly_number from "./friendly_number";

interface BigNumberProps {
	amount: number;
}

const BigNumber: React.FC<BigNumberProps> = ({ amount }) => {
	return (
		<span className="has-text-weight-bold is-family-code">
			{friendly_number(amount)}
		</span>
	);
};

export default BigNumber;
