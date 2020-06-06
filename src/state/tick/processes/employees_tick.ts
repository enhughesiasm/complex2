import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import { lerp } from "../../../components/shared/functions";

export const employees_tick = {
	enabled: false,
	id: "EMPLOYEES_TICK",
	priority: 20,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes } = worldState;

		employees.all.forEach((e) => {
			tickEmployee(e, attributes, worldState, delta_sec);
		});
	},
};

function tickEmployee(
	emp: Employee,
	attributes: PlayerAttributes,
	worldState: WorldState,
	delta_sec: number
) {
	const { prelifeMap: map } = worldState;

	if (emp.currentTile === undefined) {
		emp.currentTile = map.getTile(map.COMPLEX_POSITION);
	}

	if (emp.destinationTile === undefined) {
		// we're not going anywhere, so wander about within our tile
		if (
			emp.mapCoOrds[0] === emp.destCoOrds[0] &&
			emp.mapCoOrds[1] === emp.destCoOrds[1]
		) {
			emp.destCoOrds = emp.currentTile.getCoordsRandom();
		}
	}

	emp.moveTowardsDestCoords(attributes, map, delta_sec);

	emp.happinessFactor -=
		emp.happinessFactor * attributes.employeeHappiness_decayFactor * delta_sec;
	emp.happinessFactor = Math.max(
		emp.happinessFactor,
		attributes.employeeHappiness_min
	);
}
