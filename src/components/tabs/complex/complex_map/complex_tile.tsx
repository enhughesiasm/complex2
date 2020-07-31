import React, { useState, useContext } from "react";
import { Rect, Image, Group } from "react-konva";
import ComplexAreaTile from "../../../../state/complex_area/complex_area_tile";
import { BuildingTypes } from "../../../../state/complex_area/buildings/building_types";
import AppContext from "../../../../state/app_context";

export interface IComplexTileProps {
	tile: ComplexAreaTile;
	size: number;
	x: number;
	y: number;
}

const ComplexTile: React.FC<IComplexTileProps> = ({ tile, size, x, y }) => {
	const { worldState } = useContext(AppContext);
	const { complexArea } = worldState;

	const [hover, setHover] = useState(false);

	const image = new window.Image();
	image.src = tile.building.image;

	const ghost = new window.Image();
	ghost.src = complexArea.selectedBuilding.imageGhost;

	return (
		<>
			<Image
				x={x}
				y={y}
				image={hover ? ghost : image}
				onMouseOver={(e) => {
					setHover(true);
					const container = e.target.getStage()?.container();
					if (container) {
						container.style.cursor = "none";
					}
				}}
				onMouseOut={(e) => {
					setHover(false);
					const container = e.target.getStage()?.container();
					if (container) {
						container.style.cursor = "default";
					}
				}}
				onClick={(e) => {
					if (complexArea.selectedBuilding.type !== tile.building.type) {
						complexArea.buildBuilding(
							complexArea.selectedBuilding,
							tile,
							worldState
						);
					}
				}}
			/>
		</>
	);
};

export default ComplexTile;
