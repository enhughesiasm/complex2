import Denque from "denque";
import WorldState from "../world_state";
import { ensure } from "../../components/shared/functions";
import historyMonitors, { IHistoryMonitor } from "./history_monitors";

const MAX_AMOUNT = 128;
const SECOND_FRACTION = 0.25;

class HistoryStat {
	name: string;
	display: string;

	currentVelocitySec: number = 0;

	lastValue?: number = undefined;
	lastSample: number = 0;

	sampleHistory: Denque<number> = new Denque<number>();

	constructor(name: string, display: string) {
		this.name = name;
		this.display = display;
	}

	add(value: number, delta_sec: number) {
		if (value === undefined) return;

		this.lastSample += delta_sec;
		if (this.lastSample >= SECOND_FRACTION) {
			this.lastSample = 0;
			this.sampleHistory.push(value);

			if (this.sampleHistory.length > MAX_AMOUNT) {
				this.sampleHistory.shift();
			}
		}

		this.recalculateAverages();
	}

	recalculateAverages(): void {
		this.currentVelocitySec =
			this.sampleHistory.length > 0
				? ((this.sampleHistory.peekBack() ?? 0) -
						(this.sampleHistory.peekFront() ?? 0)) /
				  (this.sampleHistory.length * SECOND_FRACTION)
				: 0;
	}
}

/** keeps track of what's been happening for player info purposes */
export default class GameHistory {
	stats: Array<HistoryStat> = [];

	toRecord: Array<IHistoryMonitor> = historyMonitors;

	constructor() {
		this.toRecord.forEach((tr) => {
			this.stats.push(new HistoryStat(tr.name, tr.display));
		});
	}

	update(worldState: WorldState, delta_sec: number): void {
		// sort of unsure how i feel about this but i don't *entirely* hate it. TK: revisit!
		// the IHistoryMonitor and HistoryStat objects could definitely be the same thing, just give the
		// func to the stat, and pass in the worldstate
		this.toRecord.forEach((tr) => {
			const stat = ensure<HistoryStat>(
				this.stats.find((s) => s.name === tr.name)
			);
			stat.add(tr.func(worldState), delta_sec);
		});
	}
}
