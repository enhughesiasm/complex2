import debugValues from "./debug_values";
import IWorldState from "./IWorldState";
import WorldState from "./world_state";

const debug = true && process.env.NODE_ENV === "development";

export const localStorageKey = "feelings_save_v1";

function encodeSave(world_state: IWorldState): string {
	return btoa(JSON.stringify(world_state));
}

function decodeSave(save: string): IWorldState {
	return JSON.parse(atob(save));
}

export function saveFeelingsStateToLocalStorage(world_state: IWorldState) {
	if (!world_state) {
		console.error("no state to save!");
		return;
	}

	localStorage.setItem(localStorageKey, encodeSave(world_state));
}

export default function loadWorldState(): IWorldState {
	let values = new WorldState();

	let rawSave = localStorage.getItem(localStorageKey);

	// if we have saved values, overwrite with them
	if (rawSave) {
		let saveData = decodeSave(rawSave);
		for (let prop in saveData) {
			// undo any serialisation here if necessary
			switch (prop) {
				// case 'totalTimePlayed':
				// 	values[prop] = moment.duration(savedValues[prop]);
				// 	break;
				default:
					values[prop] = saveData[prop];
					break;
			}
		}
	}

	// if we're in debug mode, override props
	if (debug) {
		for (let debugProp in debugValues) {
			values[debugProp] = debugValues[debugProp];
		}
	}

	return values;
}
