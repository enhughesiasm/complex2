import React, { useContext } from "react";
import HandsTab from "../tabs/hands/hands_tab";
import AppContext from "../../state/app_context";
import LettersTab from "../tabs/letters/letters_tab";
import { GameTabType } from "../../state/game_tabs";

interface MainProps {}

const Main: React.SFC<MainProps> = (props) => {
	const { gameState } = useContext(AppContext);

	return (
		<>
			<main className="column is-full-height">
				{gameState.activeTab === GameTabType.HANDS && <HandsTab />}
				{gameState.activeTab === GameTabType.LETTERS && <LettersTab />}
			</main>
		</>
	);
};

export default Main;
