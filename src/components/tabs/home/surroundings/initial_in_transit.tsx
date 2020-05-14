import * as React from 'react';
import AppContext from '../../../../state/app_context';
import HandsTrait from "../hands_trait";
import { useTransition, animated } from "react-spring";
import transitionConfig from './surroundings_transitions';

const InitialInTransit : React.FC = (props) => {
    const { gameState, worldState } = React.useContext(AppContext);

	const handTraitDeliveries = useTransition(worldState.deliveryManager.handDeliveries, (item) => item.id, transitionConfig);

	const volunteerTraitDeliveries = useTransition(worldState.deliveryManager.volunteerHandDeliveries, (item) => item.id, transitionConfig);


    return(<div className='tile is-child box'>
        <h3 className="subtitle has-text-weight-bold">In Transit</h3>
			{ handTraitDeliveries.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} tag='You'/>
				</animated.div>
			))}
			{ volunteerTraitDeliveries.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} tag='Volunteer'/>
				</animated.div>
			))}
    </div>);
}

export default InitialInTransit;