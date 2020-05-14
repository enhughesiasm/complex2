import WorldState from "../world_state";

export interface ITickProcess {
	enabled: boolean;
	priority: number;
	run(worldState: WorldState, delta_sec: number): void;
}
