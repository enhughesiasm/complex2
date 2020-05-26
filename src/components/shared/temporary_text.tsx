import React from "react";
import { textNotificationTime_s } from "../../state/constants";
import { lerp } from "./functions";

interface ITemporaryTextProps {
	secsSinceStart: number;
	text: string;
}

const TemporaryText: React.FC<ITemporaryTextProps> = ({
	secsSinceStart,
	text,
}) => {
	const bottom = lerp(secsSinceStart, 0, textNotificationTime_s, 0, 1.5);

	return (
		<>
			{secsSinceStart < textNotificationTime_s && text && (
				<span style={{ position: "relative" }}>
					<span
						className="is-size-7 notification is-success"
						style={{
							position: "absolute",
							opacity: ".6",
							right: "-2rem",
							bottom: bottom + "rem",
							padding: "0.2rem",
						}}
					>
						{text}
					</span>
				</span>
			)}
		</>
	);
};

export default TemporaryText;
