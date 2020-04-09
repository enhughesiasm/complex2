import IWorldState from '../state/IWorldState';
import generateTrait from '../state/traits/generator/generate_trait';

export default function tempMakeIndividualTrait(worldState: IWorldState) {
	// TODO: this won't work this way, it'll actually start the making process
	// this is purely to bootstrap the generate code
	const newTrait = generateTrait(worldState.traitGenerator);
	worldState.handTraits.push(newTrait);
}
