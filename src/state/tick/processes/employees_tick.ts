import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";

export const employees_tick = {
	enabled: false,
	id: "EMPLOYEES_TICK",
	priority: 20,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes } = worldState;

		employees.all.forEach((e) => {
			tickEmployee(e, attributes, delta_sec);
		});
	},
};

function tickEmployee(
	emp: Employee,
	attributes: PlayerAttributes,
	delta_sec: number
) {
	// const rand = 1 + Math.random() * 0.5;

	emp.happinessFactor -=
		emp.happinessFactor * attributes.employeeHappiness_decayFactor * delta_sec;
	emp.happinessFactor = Math.max(
		emp.happinessFactor,
		attributes.employeeHappiness_min
	);
}
