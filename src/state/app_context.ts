import React from 'react';
import IGameState from './IGameState';
import IWorldState from './IWorldState';
import WorldState from './world_state';
import GameState from './game_state';

interface IAppContext {
	gameState: IGameState;
	worldState: IWorldState;
}

const temp_ws = new WorldState();
// these defaults will be ignored as the Provider provides an actual value
const defaults: IAppContext = {
	gameState: new GameState(temp_ws),
	worldState: temp_ws,
};

const AppContext = React.createContext<IAppContext>(defaults);

export default AppContext;
