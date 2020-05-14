import Letter, { ILetter, LettersContents } from './letters';

export interface ILettersManager {
	allLetters: Array<ILetter>;

	getUnreadCount(): number;
	getInboxLetters(): Array<ILetter>;
	markAsRead(id: string): void;
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

	markAsRead(id: string) {
		if (!id) {
			console.error("Can't mark letter as read, no id provided.");
			return;
		}

		const l = this.allLetters.find((a) => a.id === id);
		if (!l) {
			console.error('Marking nonexistent letter as read!', id);
			return;
		}

		l.unread = false;
	}

	getInboxLetters() {
		return this.allLetters.filter((a) => a.available);
	}
}
