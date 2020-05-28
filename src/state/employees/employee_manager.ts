import { employeeBaseCost, employeeCostGrowthExponent } from "./../constants";
import Employee from "./employee";
import { JobTypes } from "../jobs/job_types";
import WorldState from "../world_state";
import { roundToNearest as roundUpToNearest } from "../../components/shared/functions";

export default class Employees {
	unlocked: boolean = false;

	unlockedJobs: Array<JobTypes> = [JobTypes.Gathering];

	all: Array<Employee> = [];

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

	hire(): void {
		// TK: take cost, calculate cost etc
		this.all.push(new Employee());
	}
}
