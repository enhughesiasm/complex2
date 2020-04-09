import React, { useContext } from 'react';
import PatchNotes from '../footer/patch_notes';
import AppContext from '../../state/app_context';

const QuickviewContainer: React.FC = (props) => {
	const { gameState } = useContext(AppContext);

	return (
		<>
			<PatchNotes
				patchNotesActive={gameState.patchNotesActive}
				onTogglePatchNotes={gameState.togglePatchNotes}
			/>
		</>
	);
};

export default QuickviewContainer;
