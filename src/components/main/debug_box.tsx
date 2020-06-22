import React, { useContext } from "react";
import FontAwesome from "../shared/font_awesome";
import AppContext from "../../state/app_context";
export function DebugBox() {
	const { worldState } = useContext(AppContext);

	const rarityLevel = worldState.playerAttributes.getRarityLevel(
		worldState.research
	);

	return (
		<div className="notification is-dark">
			{" "}
			<div className="tile is-child box is-size-7 is-paddingless">
				{/* TK move this to a much better place in the UI; also maybe it doesn't make sense */}
				{/* TK maybe a big ol' configuration screen? with many similar options */}
				<div>{worldState.employees.all.length}</div>
				<div>
					Minimum Delivery Batch Size:{" "}
					{worldState.playerAttributes.minimumDeliveryBatchSize}
					<span
						className="buttons"
						style={{
							display: "inline-flex",
							marginLeft: ".3rem",
						}}
					>
						<button
							className="button is-rounded is-info is-super-small"
							disabled={
								worldState.playerAttributes.minimumDeliveryBatchSize === 1
							}
							onClick={() =>
								worldState.playerAttributes.minimumDeliveryBatchSize--
							}
						>
							<FontAwesome icon="minus" />
						</button>
						{/* TK typable amount... if this ends up making it into the game */}
						<button
							className="button is-rounded is-info is-super-small"
							disabled={
								worldState.playerAttributes.minimumDeliveryBatchSize ===
								worldState.playerAttributes.deliveryCarryCapacity
							}
							onClick={() =>
								worldState.playerAttributes.minimumDeliveryBatchSize++
							}
						>
							<FontAwesome icon="plus" />
						</button>
					</span>
				</div>
				<div>
					Rarity Level: {rarityLevel}
					{/* <span
          className="buttons"
          style={{ display: "inline-flex", marginLeft: ".3rem" }}
          > */}
					{/* <button
          	className="button is-rounded is-info is-super-small"
          	disabled={
          		rarityLevel === 0
          	}
          	onClick={() =>
          		worldState.playerAttributes.unlockedRarityLevel--
          	}
          >
          	<FontAwesome icon="minus" /> */}
					{/* </button> */}
					{/* TK typable amount... if this ends up making it into the game */}
					{/* <button
          	className="button is-rounded is-info is-super-small"
          	disabled={
          		worldState.playerAttributes.unlockedRarityLevel ===
          		maxRarityFactor
          	}
          	onClick={() =>
          		worldState.playerAttributes.unlockedRarityLevel++
          	}
          >
          	<FontAwesome icon="plus" />
          </button> */}
					{/* </span> */}
				</div>
			</div>
		</div>
	);
}
