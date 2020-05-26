import React, { useContext } from "react";
import AppContext from "./../../state/app_context";

const Footer: React.FC = (props) => {
	var currentYear = new Date().getFullYear();
	const { gameState } = useContext(AppContext);

	return (
		<>
			<aside className="sidebarFooter has-background-dark has-text-light is-size-7">
				<span>v{gameState.version}&nbsp;</span>
				<button
					className="button is-light is-small is-rounded"
					onClick={gameState.togglePatchNotes}
				>
					changelog
				</button>
				<span>
					&copy;{" "}
					<a
						href="https://enhughesiasm.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Neil Hughes
					</a>{" "}
					2020
					{currentYear !== 2020 ? "—" + currentYear : ""}
				</span>
			</aside>
		</>
	);
};

export default Footer;
