import PlayerAttributes from "../../player_attributes";

export default interface IAction {
	action: string;
	nextAction: string;
	getSpeed(attributes: PlayerAttributes): number;
}
