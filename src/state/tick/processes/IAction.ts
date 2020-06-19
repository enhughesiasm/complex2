import PlayerAttributes from "../../player_attributes";
import Research from "../../research/research";

export default interface IAction {
	action: string;
	nextAction: string;
	getSpeed(attributes: PlayerAttributes, research: Research): number;
}
