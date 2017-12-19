/**
 * External dependencies
 */
import { some, intersection, uniq } from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { IconButton, withContext } from '@wordpress/components';
import { Component, compose } from '@wordpress/element';
import { getBlockType, createBlock, BlockIcon } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Inserter } from '../../../components';
import { insertBlock } from '../../../store/actions';
import {
	getMostFrequentlyUsedBlockNames,
	getBlockCount,
	getBlocks,
} from '../../../store/selectors';

/**
 * Maximum number of frequently used blocks to display.
 *
 * @type {Number}
 */
const MAX_FREQUENT_BLOCKS = 3;

export class VisualEditorInserter extends Component {
	constructor() {
		super( ...arguments );

		this.showControls = this.toggleControls.bind( this, true );
		this.hideControls = this.toggleControls.bind( this, false );

		this.state = {
			isShowingControls: false,
		};
	}

	toggleControls( isShowingControls ) {
		this.setState( { isShowingControls } );
	}

	insertBlock( name ) {
		const { onInsertBlock } = this.props;
		onInsertBlock( createBlock( name ) );
	}

	isDisabledBlock( block ) {
		return block.useOnce && some( this.props.blocks, ( { name } ) => block.name === name );
	}

	getFrequentlyUsedBlocks() {
		const { frequentlyUsedBlockNames = [], allowedBlockTypes = true } = this.props;

		// Pad frequently used blocks with Paragraph / Image if undefined
		const blocksWithDefaults = [
			...frequentlyUsedBlockNames,
			'core/paragraph',
			'core/image',
		];

		// Limit blocks to allowed if defined as array set, otherwise dedupe
		// padded types
		const blocks = Array.isArray( allowedBlockTypes ) ?
			intersection( blocksWithDefaults, allowedBlockTypes ) :
			uniq( blocksWithDefaults );

		return blocks.reduce( ( result, name ) => {
			let blockType;
			if (
				// Limit to maximum desired set size
				result.length < MAX_FREQUENT_BLOCKS &&

				// Since a frequently used block may be deactivated, verify
				// block type returns truthy before including in set
				( blockType = getBlockType( name ) )
			) {
				result.push( blockType );
			}

			return result;
		}, [] );
	}

	render() {
		const { blockCount, isLocked } = this.props;
		const { isShowingControls } = this.state;
		const classes = classnames( 'editor-visual-editor__inserter', {
			'is-showing-controls': isShowingControls,
		} );

		if ( isLocked ) {
			return null;
		}

		return (
			<div
				className={ classes }
				onFocus={ this.showControls }
				onBlur={ this.hideControls }
			>
				<Inserter
					insertIndex={ blockCount }
					position="top right" />
				{ this.getFrequentlyUsedBlocks().map( ( block ) => (
					<IconButton
						key={ 'frequently_used_' + block.name }
						className="editor-inserter__block"
						onClick={ () => this.insertBlock( block.name ) }
						label={ sprintf( __( 'Insert %s' ), block.title ) }
						disabled={ this.isDisabledBlock( block ) }
						icon={ (
							<span className="editor-visual-editor__inserter-block-icon">
								<BlockIcon icon={ block.icon } />
							</span>
						) }
					>
						{ block.title }
					</IconButton>
				) ) }
			</div>
		);
	}
}

export default compose(
	connect(
		( state ) => {
			return {
				frequentlyUsedBlockNames: getMostFrequentlyUsedBlockNames( state ),
				blockCount: getBlockCount( state ),
				blocks: getBlocks( state ),
			};
		},
		{ onInsertBlock: insertBlock },
	),
	withContext( 'editor' )( ( settings ) => {
		const { templateLock, blockTypes } = settings;

		return {
			isLocked: !! templateLock,
			allowedBlockTypes: blockTypes,
		};
	} ),
)( VisualEditorInserter );
