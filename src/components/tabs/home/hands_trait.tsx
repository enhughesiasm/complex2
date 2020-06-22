import React, { useState } from "react";
import ITrait from "../../../state/traits/ITrait";

import jar1 from "./../../../resources/images/jar1_t.png";
import jar2 from "./../../../resources/images/jar2_t.png";
import jar3 from "./../../../resources/images/jar3_t.png";
import jar4 from "./../../../resources/images/jar4_t.png";
import jar5 from "./../../../resources/images/jar5_t.png";
import { chooseRandomElement } from "../../shared/functions";

const images = [jar1, jar2, jar3, jar4, jar5];

interface HandsTraitProps {
	trait: ITrait;
	tag?: string;
}

const HandsTrait: React.FC<HandsTraitProps> = (props) => {
	const [image] = useState(chooseRandomElement(images));

	return (
		<div
			className="handsTrait"
			// onClick={() => handleDelivery(props.trait.id, gameState, setDelivered)}
		>
			{props.tag && (
				<span
					className={"tag is-" + (props.tag === "You" ? "success" : "primary")}
				>
					{props.tag}
				</span>
			)}
			<span className={"imgContainer"}>
				<span className={"glow is-flex rarity-" + props.trait.rarity}>
					<span
						className={"inner-glow"}
						style={{ animationDelay: Math.random() * 8 + "s" }}
					></span>
					<img alt={"trait: " + props.trait.name} src={image} />
				</span>
			</span>
			<span className="traitName is-small-caps">{props.trait.name}</span>

			{/* <button
				className={
					"button is-small is-rounded" +
					(delivered ? " is-success " : " is-warning ")
				}
			>
				{delivered ? "delivering" : "deliver"}
			</button> */}
		</div>
	);
};

export default React.memo(HandsTrait);
