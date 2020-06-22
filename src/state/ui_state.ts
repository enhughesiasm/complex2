import ITrait from "./traits/ITrait";

export default class UIState {
	traitsSummaryAccumulatedSeconds: number = 0;
	traitsSummaryTraits: Array<ITrait> = [];
}
