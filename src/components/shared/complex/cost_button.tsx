import React from "react";
import Cost from "./cost";

export interface ICostButtonProps {
	text: string;
	canAfford: boolean;
	amount: number;
	onPurchase: Function;
	size?: string;
	successStatus?: string;
}

const CostButton: React.FC<ICostButtonProps> = ({
	text,
	canAfford,
	onPurchase,
	amount,
	size = "small",
	successStatus = "success",
}) => (
	<button
		className={`button is-rounded is-${
			canAfford ? successStatus : "danger"
		} is-${size}`}
		disabled={!canAfford}
		onClick={() => onPurchase()}
	>
		{text}
		<span>
			&nbsp;—
			<Cost amount={amount} />
		</span>
	</button>
);

export default CostButton;
