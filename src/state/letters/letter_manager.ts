import Letter, { ILetter, LettersContents } from './letters';

export interface ILettersManager {
	allLetters: Array<ILetter>;

	getUnreadCount(): number;
	getAvailableLetters(): Array<ILetter>;
	markAsRead(index: number): void;
}

export default class LettersManager implements ILettersManager {
	allLetters: Array<ILetter>;

	init() {
		console.log('LetterManager needs proper init once all letters defined');
	}

	constructor() {
		this.init();
		this.allLetters = [];
		this.allLetters.push(
			new Letter(
				true,
				true,
				LettersContents.Intro,
				'Management',
				'Welcome Aboard'
			)
		);
		this.allLetters.push(
			new Letter(
				true,
				false,
				LettersContents.Dummy,
				'Management',
				'And another thing...'
			)
		);
	}

	getUnreadCount() {
		return this.allLetters.filter((a) => a.unread).length;
	}

	markAsRead(index: number) {
		if (index >= 0 && index < this.getAvailableLetters().length) {
			this.allLetters[index].unread = false;
		} else {
			console.error('Marking unreadable letter as read, index: ', index);
		}
	}

	getAvailableLetters() {
		return this.allLetters.filter((a) => a.available);
	}
}
