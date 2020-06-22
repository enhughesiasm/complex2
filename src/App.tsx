import React from "react";
import loadWorldState from "./state/load_state";
import GameState from "./state/game_state";
import moment from "moment";
import { tick_game } from "./state/tick/tick_game";
import AppContext from "./state/app_context";
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import QuickviewContainer from "./components/quickviews/quickview_container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorldState from "./state/world_state";
import UIState from "./state/ui_state";
import { tick_ui } from "./state/tick/tick_ui";

interface IAppProps {}

interface IAppState {
	lastTickTime: moment.Moment;
	worldState: WorldState;
	gameState: GameState;
	uiState: UIState;
}

export default class App extends React.Component<IAppProps, IAppState> {
	timerID?: number;

	constructor(props: IAppProps) {
		super(props);

		const worldState = loadWorldState();
		const gameState = new GameState(worldState, false);

		const uiState = new UIState();

		this.state = {
			lastTickTime: moment(),
			gameState: gameState,
			worldState: worldState,
			uiState: uiState,
		};
	}

	componentDidMount() {
		this.timerID = window.setInterval(
			() => this.tick(),
			this.state.gameState.tickLengthMs
		);
	}

	tick() {
		// each unlocked section needs to tick
		const delta_sec = moment().diff(this.state.lastTickTime) / 1000.0;

		const new_game_state = tick_game(delta_sec, this.state.gameState);

		const new_ui_state = tick_ui(
			delta_sec,
			this.state.gameState,
			this.state.uiState
		);

		// TODO TK: is this mad? why process the game state just to rewrite the world state?
		this.setState({
			lastTickTime: moment(),
			worldState: new_game_state.worldState,
			uiState: new_ui_state,
		});
	}

	render() {
		return (
			<>
				<AppContext.Provider
					value={{
						worldState: this.state.worldState,
						gameState: this.state.gameState,
						uiState: this.state.uiState,
					}}
				>
					<div id="complexPage" className="columns is-full-height">
						<Sidebar />
						<Main />
					</div>
					<QuickviewContainer />
					<ToastContainer position="bottom-center" />
				</AppContext.Provider>
			</>
		);
	}
}
