import { JobTypes } from "./../jobs/job_types";
import { create_guid } from "../../components/shared/functions";
import { generatePersonName } from "../../components/shared/names/name_generator";
export interface IEmployeeExperience {
	jobType: JobTypes;
	level: number;
	experience: number;
}

// export interface IEmployee {
// 	name: string;
// 	id: string;
// 	experience: Array<IEmployeeExperience>;
// 	happinessFactor: number;
// 	assignedJob: JobTypes;
// 	assign: Function;
// 	currentJobProgress: number;
// 	msSinceCompleted: number;
// 	completedMessage?: string;
// 	currentAction?: string;
// }

export default class Employee {
	name: string;
	id: string;
	experience: Array<IEmployeeExperience>;
	happinessFactor: number;
	assignedJob: JobTypes;
	currentJobProgress: number;
	secsSinceCompleted: number;
	completedMessage?: string;
	currentAction?: string;
	currentActionAmount?: number = undefined;

	// TK: current Job Progress, etc

	constructor(jobType: JobTypes = JobTypes.NONE) {
		this.name = generatePersonName();
		this.id = create_guid();

		this.experience = Object.keys(JobTypes)
			.filter((j) => j !== JobTypes.NONE)
			.map(
				(a): IEmployeeExperience => {
					return { jobType: a as JobTypes, experience: 0, level: 0 };
				}
			);

		this.happinessFactor = 1;
		this.assignedJob = jobType;
		this.currentJobProgress = 0;
		this.secsSinceCompleted = 0;
	}

	assign(jobType: JobTypes): void {
		this.assignedJob = jobType;
		this.currentJobProgress = 0;
	}
}
