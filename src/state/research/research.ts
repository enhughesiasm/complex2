import { IResearchItem } from "./IResearchItem";
import { ensure } from "../../components/shared/functions";
import WorldState from "../world_state";

export default class Research {
	tree: IResearchItem;
	currentId?: string;
	hoverId?: string;

	constructor(tree: IResearchItem) {
		this.tree = tree;
	}

	setHover(node: IResearchItem | undefined) {
		this.hoverId = node?.research_id;
	}

	setResearch(id: string, worldState: WorldState) {
		const node = this.getItem(id);

		if (node.progressPercent >= 100 || node.completeClaimed) return; // TK handle repeatable research
		if (!node.prerequisitesMet(worldState)) return;

		this.currentId = node.research_id;
	}

	completeCurrentResearch(worldState: WorldState): void {
		if (this.currentId) {
			const node = this.getItem(this.currentId);

			node.onComplete(worldState);
			node.progressPercent = 100;
			node.completeClaimed = true;
			this.currentId = undefined;
		}
	}

	getItem(id: string): IResearchItem {
		if (!id) {
			console.error(`missing id in getItem: ${id}`);
		}

		return ensure(this.searchTree(id, this.tree));
	}

	/** recursively searches through a research tree given a start node, and returns the matching id, or nothing */
	searchTree(id: string, node: IResearchItem): IResearchItem | undefined {
		if (node.research_id === id) {
			return node;
		} else if (node.children.length > 0) {
			let result = undefined;
			for (let i = 0; i < node.children.length; i++) {
				result = this.searchTree(id, node.children[i]);
				if (result !== undefined) {
					break;
				}
			}

			return result;
		}
		return undefined;
	}

	isComplete(id: string): boolean {
		return this.getItem(id).progressPercent >= 100;
	}
}
