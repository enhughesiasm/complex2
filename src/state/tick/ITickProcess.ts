import IWorldState from "../IWorldState";

export interface ITickProcess {
	enabled: boolean;
	priority: number;
	run(worldState: IWorldState, delta_sec: number): void;
}
