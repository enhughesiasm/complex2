import produce from 'immer';
import IWorldState from './IWorldState';

export function process_world(
	delta_sec: number,
	world_state: IWorldState
): IWorldState {
	const nextState = produce(world_state, (draftState) => {});

	return nextState;
}
