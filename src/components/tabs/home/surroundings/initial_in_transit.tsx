import * as React from "react";
import AppContext from "../../../../state/app_context";
import HandsTrait from "../hands_trait";
import { useTransition, animated, UseTransitionResult } from "react-spring";
import transitionConfig from "./surroundings_transitions";
import Enumerable from "linq";
import ITrait from "../../../../state/traits/ITrait";
import Circle from "react-circle";
import styleVariables from "../../../../resources/styles/styles";

const maxToShow = 5; // TK  move this

interface IInTransitGroup {
	traits: Enumerable.IEnumerable<ITrait>;
	tag: string;
	remainder: number;
}

const InitialInTransit: React.FC = (props) => {
	const { gameState, worldState } = React.useContext(AppContext);

	const [handTraits, setHandTraits] = React.useState<
		IInTransitGroup | undefined
	>(undefined);

	const [volTraits, setVolTraits] = React.useState<IInTransitGroup | undefined>(
		undefined
	);

	React.useEffect(() => {
		const h: IInTransitGroup = {
			traits: Enumerable.from(worldState.deliveryManager.handDeliveries).take(
				maxToShow
			),
			remainder:
				worldState.deliveryManager.handDeliveries.length > maxToShow
					? worldState.deliveryManager.handDeliveries.length - maxToShow
					: 0,
			tag: "You",
		};
		setHandTraits(h);
	}, [worldState.deliveryManager.handDeliveries]);

	React.useEffect(() => {
		const h: IInTransitGroup = {
			traits: Enumerable.from(
				worldState.deliveryManager.volunteerHandDeliveries
			).take(maxToShow),
			remainder:
				worldState.deliveryManager.volunteerHandDeliveries.length > maxToShow
					? worldState.deliveryManager.volunteerHandDeliveries.length -
					  maxToShow
					: 0,
			tag: "Volunteer",
		};
		setVolTraits(h);
	}, [worldState.deliveryManager.volunteerHandDeliveries]);

	// const handTraitDeliveries = useTransition(
	// 	worldState.deliveryManager.handDeliveries,
	// 	(item) => item.id,
	// 	transitionConfig
	// );

	// const volunteerTraitDeliveries = useTransition(
	// 	worldState.deliveryManager.volunteerHandDeliveries,
	// 	(item) => item.id,
	// 	transitionConfig
	// );

	return (
		<div className="tile is-child box">
			<h3 className="subtitle has-text-weight-bold">In Transit</h3>

			{handTraits && !handTraits.traits.isEmpty() && (
				<div>
					{/* TK reintroduce the useTransition stuff */}
					<span className="smallPrint">yes this is messy</span>
					{handTraits.traits.toArray().map((t) => (
						<HandsTrait trait={t} tag={handTraits.tag} />
					))}

					{handTraits.remainder > 0 && (
						<div>... and {handTraits.remainder} more...</div>
					)}
					<Circle
						progress={worldState.worldOperations.handDeliverBatchProgress}
						animate={true}
						animationDuration={"10ms"}
						showPercentage={false}
						progressColor={styleVariables.success}
						size="50"
						roundedStroke={true}
						lineWidth="50"
					/>
				</div>
			)}

			{volTraits && !volTraits.traits.isEmpty() && (
				<div>
					{/* TK reintroduce the useTransition stuff */}
					<span className="smallPrint">yes this is messy</span>
					{volTraits.traits.toArray().map((t) => (
						<HandsTrait trait={t} tag={volTraits.tag} />
					))}

					{volTraits.remainder > 0 && (
						<div>... and {volTraits.remainder} more...</div>
					)}
					<Circle
						progress={
							worldState.worldOperations.volunteerHandDeliverBatchProgress
						}
						animate={true}
						animationDuration={"10ms"}
						showPercentage={false}
						progressColor={styleVariables.primary}
						size="50"
						roundedStroke={true}
						lineWidth="50"
					/>
				</div>
			)}

			{/* { handTraitDeliveries.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} tag='You'/>
				</animated.div>
			))} */}
			{/* {volunteerTraitDeliveries.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} tag="Volunteer" />
				</animated.div>
			))} */}
		</div>
	);
};

export default InitialInTransit;
