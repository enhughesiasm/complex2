import { JobTypes } from "./../jobs/job_types";
import { create_guid } from "../../components/shared/functions";
import { generatePersonName } from "../../components/shared/names/name_generator";
import TraitsSet from "../trait_storage/traits_set";
import MapTile from "../prelife_map/map_tile";
import PlayerAttributes from "../player_attributes";
import PrelifeMap from "../prelife_map/prelife_map";
export interface IEmployeeExperience {
	jobType: JobTypes;
	level: number;
	experience: number;
}

export default class Employee {
	name: string;
	id: string;
	experience: Array<IEmployeeExperience>;
	happinessFactor: number;
	assignedJob: JobTypes;

	currentJobProgress: number;
	currentWorkSpeed: number = 0;

	secsSinceCompleted: number;
	completedMessage?: string;

	currentAction?: string;
	carrying?: TraitsSet = undefined;

	initialTile: MapTile;
	currentTile: MapTile;
	destinationTile?: MapTile = undefined;
	mapCoOrds: [number, number];
	destCoOrds: [number, number];

	constructor(startTile: MapTile, jobType: JobTypes = JobTypes.NONE) {
		this.name = generatePersonName();
		this.id = create_guid();

		this.experience = Object.keys(JobTypes)
			.filter((j) => j !== JobTypes.NONE)
			.map(
				(a): IEmployeeExperience => {
					return { jobType: a as JobTypes, experience: 0, level: 0 };
				}
			);

		this.currentTile = startTile;
		this.initialTile = startTile;
		this.mapCoOrds = startTile.getCoordsCenter();
		this.destCoOrds = startTile.getCoordsCenter();

		this.happinessFactor = 1;
		this.assignedJob = jobType;
		this.currentJobProgress = 0;
		this.secsSinceCompleted = 0;
	}

	assign(jobType: JobTypes): void {
		this.assignedJob = jobType;
		this.currentJobProgress = 0;
		this.currentAction = undefined;
		this.carrying = undefined;
		this.destinationTile = undefined;
		this.currentTile = this.initialTile;
	}

	getMoveSpeed(attributes: PlayerAttributes, delta_sec: number): number {
		return (
			attributes.e_travel_baseSpeed * attributes.overallWorkFactor * delta_sec
		);
	}

	setDestinationTile(dest: MapTile): void {
		this.destinationTile = dest;
		this.destCoOrds = dest.getCoordsCenter();
	}

	moveTowardsDestCoords(
		attributes: PlayerAttributes,
		map: PrelifeMap,
		delta_sec: number
	): void {
		if (
			this.mapCoOrds[0] === this.destCoOrds[0] &&
			this.mapCoOrds[1] === this.destCoOrds[1]
		) {
			return;
		}

		const absoluteMinimumSpeed = 0.1;

		const speed = Math.max(
			absoluteMinimumSpeed,
			this.getMoveSpeed(attributes, delta_sec)
		);

		const direction: [number, number] = this.getVectorToDestination(speed);

		// move in this direction
		this.mapCoOrds[0] = this.mapCoOrds[0] + direction[0];
		this.mapCoOrds[1] = this.mapCoOrds[1] + direction[1];

		// detect overshoots - i.e. if the direction has flipped sign in either dimension
		const newDirection: [number, number] = this.getVectorToDestination(speed);
		if (Math.sign(newDirection[0]) !== Math.sign(direction[0])) {
			// overshot x direction, just set it to destination
			this.mapCoOrds[0] = this.destCoOrds[0];
		}
		if (Math.sign(newDirection[1]) !== Math.sign(direction[1])) {
			// overshot x direction, just set it to destination
			this.mapCoOrds[1] = this.destCoOrds[1];
		}

		this.updateCurrentTileFromCoords(map);
	}

	updateCurrentTileFromCoords(map: PrelifeMap): void {
		const newPos: [number, number] = [
			Math.floor(this.mapCoOrds[0] / map.TILE_SIZE),
			Math.floor(this.mapCoOrds[1] / map.TILE_SIZE),
		];

		if (
			newPos[0] !== this.currentTile.position[0] ||
			newPos[1] !== this.currentTile.position[1]
		) {
			this.currentTile = map.getTile(newPos);
		}
	}

	getVectorToDestination(speed: number): [number, number] {
		// TK in a sane world I'd be using actual vectors but it's fun to try minimal solutions myself
		return [
			speed *
				(this.destCoOrds[0] > this.mapCoOrds[0]
					? 1
					: this.destCoOrds[0] < this.mapCoOrds[0]
					? -1
					: 0),
			speed *
				(this.destCoOrds[1] > this.mapCoOrds[1]
					? 1
					: this.destCoOrds[1] < this.mapCoOrds[1]
					? -1
					: 0),
		];
	}
}
