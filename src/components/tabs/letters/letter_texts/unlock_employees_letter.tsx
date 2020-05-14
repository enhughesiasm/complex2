import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";

const UnlockEmployeesLetter: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<>
			<div>Dear Supplier,</div>
			<div>
				Thanks for your initial delivery of traits. I'm pleased to say that
				they're already proving extremely popular with the customers.
			</div>
			<div>
				I couldn't help overhearing your complaining at the length of the
				journey here and the time taken to produce the traits. I've found it
				helpful to take on permanent help--'employees', of sorts.
			</div>
			<div>Perhaps you might find it helpful to do the same.</div>
			<div className="signature">
				<div>Yours,</div>
				<div>The Shopkeeper</div>
			</div>
			<div className="has-text-centered">
				<button
					className="button is-success is-rounded"
					disabled={worldState.employees.unlocked}
					onClick={() => gameState.unlockEmployees()}
				>
					find employees
				</button>
			</div>
		</>
	);
};

export default UnlockEmployeesLetter;
