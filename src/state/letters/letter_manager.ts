import { ILetter } from "./ILetter";
import moment from "moment";
import { create_guid } from "../../components/shared/functions";
import letterDefinitions, { LetterTypes } from "./letters";

export default class LettersManager {
	inbox: Array<ILetter> = [];

	getInboxLetters(): Array<ILetter> {
		return this.inbox.filter((a) => a.available);
	}

	getUnreadCount(): number {
		return this.inbox.filter((a) => a.unread).length;
	}

	markAsRead(id: string): void {
		if (!id) {
			console.error("Can't mark letter as read, no id provided.");
			return;
		}

		const l = this.inbox.find((a) => a.id === id);
		if (!l) {
			console.error("Marking nonexistent letter as read!", id);
			return;
		}

		l.unread = false;
	}

	sendLetter(type: LetterTypes): void {
		switch (type) {
			case LetterTypes.Dummy:
				console.error("Sending dummy letter");
				console.trace();
				break;
			// TK: implement 'template style' letters here than can be randomly generated
			default:
				const definition = letterDefinitions.find((a) => a.type === type);
				if (!definition) {
					console.error(`Missing letter type ${type}. Failed to send.`);
					return;
				}
				this.inbox.push({
					id: create_guid(),
					type: type,
					from: definition.from,
					subject: definition.subject,
					receivedAt: moment(),
					available: true,
					unread: true,
				});
		}
	}
}
