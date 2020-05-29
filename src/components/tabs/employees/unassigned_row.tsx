import React from "react";

export interface IUnassignedRowProps {
	unassigned: number;
}

const UnassignedRow: React.FC<IUnassignedRowProps> = ({ unassigned }) => (
	<tr>
		<td className="has-text-weight-bold">Unassigned</td>
		<td>
			<span
				className={
					"has-text-weight-bold has-text-" +
					(unassigned === 0 ? "success" : "danger")
				}
			>
				{unassigned}
			</span>{" "}
			{unassigned === 1 ? "person" : "people"}
		</td>
	</tr>
);

export default UnassignedRow;
