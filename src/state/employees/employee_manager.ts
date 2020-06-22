import { JobTypes } from "./../jobs/job_types";
import { employeeBaseCost, employeeCostGrowthExponent } from "./../constants";
import Employee from "./employee";
import WorldState from "../world_state";
import { roundToNearest as roundUpToNearest } from "../../components/shared/functions";
import MapTile from "../prelife_map/map_tile";
import TraitsSet from "../trait_storage/traits_set";

export default class Employees {
	unlocked: boolean = false;

	unlockedJobs: Array<JobTypes> = [JobTypes.Gathering];

	all: Array<Employee> = [];

	deliverers(): Array<Employee> {
		return this.all.filter((a) => a.assignedJob === JobTypes.Delivering);
	}

	getTotalCarriedByDeliverers(): number {
		return this.deliverers()
			.filter((e) => e.carrying !== undefined)
			.map((e) => (e.carrying ?? new TraitsSet()).getTotal())
			.reduce((a, b) => a + b, 0);
	}

	getCarriedByDeliverers(level: number): number {
		return this.deliverers()
			.filter((e) => e.carrying !== undefined)
			.map((e) => (e.carrying ?? new TraitsSet()).get(level))
			.reduce((a, b) => a + b, 0);
	}

	getHireCost(): number {
		const currentAmount = this.all.length;
		const cost = Math.floor(
			employeeBaseCost * Math.pow(employeeCostGrowthExponent, currentAmount)
		);

		let orderOfMagnitude = Math.floor(Math.log10(cost));

		if (orderOfMagnitude > 2) {
			orderOfMagnitude -= 1;
			if (orderOfMagnitude > 4) {
				orderOfMagnitude -= 1;
			}
		}

		return roundUpToNearest(cost, Math.pow(10, orderOfMagnitude));
	}

	canHire(worldState: WorldState): boolean {
		return worldState?.favours >= this.getHireCost();
	}

	hire(startTile: MapTile, jobType: JobTypes = JobTypes.NONE): void {
		this.all.push(new Employee(startTile, jobType));
	}

	getAmountAssigned(jobType: JobTypes): number {
		return this.all.filter((a) => a.assignedJob === jobType).length;
	}
}
