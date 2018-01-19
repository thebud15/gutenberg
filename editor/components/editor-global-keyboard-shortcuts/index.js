/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import { KeyboardShortcuts, withContext } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getBlockUids, getMultiSelectedBlockUids } from '../../store/selectors';
import { clearSelectedBlock, redo, undo, removeBlocks } from '../../store/actions';

class EditorGlobalKeyboardShortcuts extends Component {
	constructor() {
		super( ...arguments );
		this.undoOrRedo = this.undoOrRedo.bind( this );
		this.deleteSelectedBlocks = this.deleteSelectedBlocks.bind( this );
	}

	undoOrRedo( event ) {
		const { onRedo, onUndo } = this.props;
		if ( event.shiftKey ) {
			onRedo();
		} else {
			onUndo();
		}

		event.preventDefault();
	}

	deleteSelectedBlocks( event ) {
		const { multiSelectedBlockUids, onRemove, isLocked } = this.props;
		if ( multiSelectedBlockUids.length ) {
			event.preventDefault();
			if ( ! isLocked ) {
				onRemove( multiSelectedBlockUids );
			}
		}
	}

	render() {
		return (
			<KeyboardShortcuts shortcuts={ {
				'mod+z': this.undoOrRedo,
				'mod+shift+z': this.undoOrRedo,
				backspace: this.deleteSelectedBlocks,
				del: this.deleteSelectedBlocks,
				escape: this.props.clearSelectedBlock,
			} } />
		);
	}
}

export default compose(
	connect(
		( state ) => {
			return {
				uids: getBlockUids( state ),
				multiSelectedBlockUids: getMultiSelectedBlockUids( state ),
			};
		},
		{
			clearSelectedBlock,
			onRedo: redo,
			onUndo: undo,
			onRemove: removeBlocks,
		}
	),
	withContext( 'editor' )( ( settings ) => {
		const { templateLock } = settings;

		return {
			isLocked: !! templateLock,
		};
	} ),
)( EditorGlobalKeyboardShortcuts );
