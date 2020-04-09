import neutrals from './data/neutral.json';
import positive_basic from './data/positive_basic.json';
import positive_rare from './data/positive_rare.json';
import negative_basic from './data/negative_basic.json';
import negative_rare from './data/negative_rare.json';
import nouns_basic from './data/nouns_basic.json';
import nouns_rare from './data/nouns_rare.json';
import preferences from './data/preferences.json';
import adverbs from './data/adverbs.json';

export default function generateTraitName(
	level: string,
	nuanceFraction: number
) {
	let name = 'NONE';

	switch (level) {
		case 'neutral':
			name = neutrals.random();
			break;
		case 'positive_basic':
			name = positive_basic.random();
			break;
		case 'positive_rare':
			name = positive_rare.random();
			break;
		case 'negative_basic':
			name = negative_basic.random();
			break;
		case 'negative_rare':
			name = negative_rare.random();
			break;
		case 'preferences_basic':
			name = preferences.random() + ' ' + nouns_basic.random();
			break;
		case 'preferences_rare':
			name = preferences.random() + ' ' + nouns_rare.random();
			break;

		default:
			console.error('trait generator not implemented; level: ', level);
			name = 'ERROR';
			break;
	}

	return (getNuance(nuanceFraction) + ' ' + name).trim().toUpperCase();
}

function getNuance(nuanceFraction: number): string {
	if (nuanceFraction > 1) nuanceFraction = 1;
	if (nuanceFraction < 0) nuanceFraction = 0;

	let nuance = '';

	if (Math.random() < nuanceFraction) {
		nuance = adverbs.random();
	}

	return nuance;
}
