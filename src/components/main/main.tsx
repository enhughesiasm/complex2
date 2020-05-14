import React, { useContext } from "react";
import HomeTab from "../tabs/home/home_tab";
import AppContext from "../../state/app_context";
import LettersTab from "../tabs/letters/letters_tab";
import { GameTabType } from "../../state/game_tabs";

interface MainProps {}

const Main: React.SFC<MainProps> = (props) => {
	const { gameState } = useContext(AppContext);

	return (
		<>
			<main className="column is-full-height">
				{gameState.activeTab === GameTabType.HOME && <HomeTab />}
				{gameState.activeTab === GameTabType.LETTERS && <LettersTab />}
			</main>
		</>
	);
};

export default Main;
