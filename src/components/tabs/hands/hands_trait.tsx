import React, { useContext, useState } from "react";
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
}

const HandsTrait: React.FC<HandsTraitProps> = (props) => {
	const [image, setImage] = useState(chooseRandomElement(images));

	const bubbles = 10;

	return (
		<div
			className="handsTrait"
			// onClick={() => handleDelivery(props.trait.id, gameState, setDelivered)}
		>
			<span className="imgContainer">
				{[...Array(bubbles)].map((a, i) => (
					<div key={i} className="bubble" />
				))}
				<img alt={"trait: " + props.trait.name} src={image} />
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
