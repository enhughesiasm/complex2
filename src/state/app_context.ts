import React from "react";
import WorldState from "./world_state";
import GameState from "./game_state";
import UIState from "./ui_state";

interface IAppContext {
	gameState: GameState;
	worldState: WorldState;
	uiState: UIState;
}

const temp_ws = new WorldState();
// these defaults will be ignored as the Provider provides an actual value
const defaults: IAppContext = {
	gameState: new GameState(temp_ws, true),
	worldState: temp_ws,
	uiState: new UIState(),
};

const AppContext = React.createContext<IAppContext>(defaults);

export default AppContext;
