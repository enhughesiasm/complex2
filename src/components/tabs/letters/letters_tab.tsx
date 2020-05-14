import React, { useContext, useState } from "react";
import AppContext from "../../../state/app_context";
import LetterContents from "./letter_contents";

const LettersTab: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	const unreadCount = worldState.letterManager.getUnreadCount();

	const [activeIndex, setActiveIndex] = useState(-1);

	return (
		<section className="tile is-ancestor is-vertical">
			<div className="tile is-parent">
				<div className="tile is-child">
					{unreadCount > 0 && (
						<section className="box notification is-danger">
							You have {unreadCount} unread letter
							{unreadCount > 1 ? "s" : ""}.
						</section>
					)}
					{unreadCount == 0 && (
						<section className="box notification is-light">
							It&apos;s always nice to get something in the post.
						</section>
					)}
				</div>
			</div>

			<div className="tile is-parent">
				<div className="tile is-child is-5">
					<nav className="panel is-primary">
						<p className="panel-heading">LETTERS</p>

						{worldState.letterManager.getInboxLetters().map((l, i) => (
							<a
								onClick={() => {
									setActiveIndex(i);
									worldState.letterManager.markAsRead(l.id);
								}}
								className={
									"panel-block lettersPanel" +
									(i === activeIndex ? " is-active paper " : " ") +
									(l.unread ? " is-danger " : " ")
								}
								style={{ justifyContent: "space-between" }}
							>
								<span
									className={
										"panel-icon" + (l.unread ? "  has-text-danger " : "")
									}
								>
									<i
										className={
											"fas fa-" + (l.unread ? "envelope" : "envelope-open")
										}
									></i>
								</span>
								<span className="has-text-weight-bold">{l.from}</span>
								<span style={{ color: "#777" }}>{l.subject}</span>
							</a>
						))}
					</nav>
				</div>
				{activeIndex !== -1 && (
					<LetterContents
						contents={worldState.letterManager.allLetters[activeIndex].contents}
					/>
				)}
			</div>
		</section>
	);
};

export default LettersTab;
