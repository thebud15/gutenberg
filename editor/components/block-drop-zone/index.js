/**
 * External Dependencies
 */
import { connect } from 'react-redux';
import { reduce, includes, get, find } from 'lodash';

/**
 * WordPress dependencies
 */
import { DropZone, withContext } from '@wordpress/components';
import { getBlockTypes } from '@wordpress/blocks';
import { compose } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { insertBlocks } from '../../store/actions';

export function BlockDropZone( { index, isLocked, allowedBlockTypes, ...props } ) {
	if ( isLocked ) {
		return null;
	}

	const dropFiles = ( files, position ) => {
		const transformation = reduce( getBlockTypes(), ( ret, blockType ) => {
			if ( Array.isArray( allowedBlockTypes ) && ! includes( allowedBlockTypes, blockType.name ) ) {
				return ret;
			}

			if ( ret ) {
				return ret;
			}

			return find( get( blockType, 'transforms.from', [] ), ( transform ) => (
				transform.type === 'files' && transform.isMatch( files )
			) );
		}, false );

		if ( transformation ) {
			let insertPosition;
			if ( index !== undefined ) {
				insertPosition = position.y === 'top' ? index : index + 1;
			}
			transformation.transform( files ).then( ( blocks ) => {
				props.insertBlocks( blocks, insertPosition );
			} );
		}
	};

	return (
		<DropZone
			onFilesDrop={ dropFiles }
		/>
	);
}

export default compose(
	connect(
		undefined,
		{ insertBlocks }
	),
	withContext( 'editor' )( ( settings ) => {
		const { templateLock, blockTypes } = settings;

		return {
			isLocked: !! templateLock,
			allowedBlockTypes: blockTypes,
		};
	} )
)( BlockDropZone );
