/**
 * External dependencies
 */
import { bindActionCreators } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { flow, pick, noop } from 'lodash';

/**
 * WordPress Dependencies
 */
import { createElement, Component } from '@wordpress/element';
import { EditableProvider } from '@wordpress/blocks';
import {
	APIProvider,
	DropZoneProvider,
	SlotFillProvider,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { setupEditor, undo } from '../../store/actions';
import store from '../../store';

/**
 * Default editor settings
 *
 * Default settings can be overridden when calling createEditorInstance
 *
 * wideImages {Boolean}            Whether wide/full alignments are available
 * maxWidth   {Number}             Max width of the block inner area, used to
 *                                 constrain image resizing
 * blockTypes {(Boolean|String[])} Allowed block types, defaulting to true (all
 *                                 block types allowed)
 *
 * @var {Object} DEFAULT_SETTINGS
 */
const DEFAULT_SETTINGS = {
	wideImages: false,
	maxWidth: 608,
	blockTypes: true,
};

class EditorProvider extends Component {
	constructor( props ) {
		super( ...arguments );

		this.store = store;

		this.settings = {
			...DEFAULT_SETTINGS,
			...props.settings,
		};

		// Assume that we don't need to initialize in the case of an error recovery.
		if ( ! props.recovery ) {
			this.store.dispatch( setupEditor( props.post, this.settings ) );
		}
	}

	getChildContext() {
		return {
			editor: this.settings,
		};
	}

	componentWillReceiveProps( nextProps ) {
		if (
			nextProps.settings !== this.props.settings
		) {
			// eslint-disable-next-line no-console
			console.error( 'The Editor Provider Props are immutable.' );
		}
	}

	render() {
		const { children } = this.props;
		const providers = [
			// Redux provider:
			//
			//  - context.store
			[
				ReduxProvider,
				{ store: this.store },
			],

			// Editable provider:
			//
			//  - context.onUndo
			[
				EditableProvider,
				bindActionCreators( {
					onUndo: undo,
				}, this.store.dispatch ),
			],

			// Slot / Fill provider:
			//
			//  - context.getSlot
			//  - context.registerSlot
			//  - context.unregisterSlot
			[
				SlotFillProvider,
			],

			// APIProvider
			//
			//  - context.getAPISchema
			//  - context.getAPIPostTypeRestBaseMapping
			//  - context.getAPITaxonomyRestBaseMapping
			[
				APIProvider,
				{
					...wpApiSettings,
					...pick( wp.api, [
						'postTypeRestBaseMapping',
						'taxonomyRestBaseMapping',
					] ),
				},
			],

			// DropZone provider:
			[
				DropZoneProvider,
			],
		];

		const createEditorElement = flow(
			providers.map( ( [ Provider, props ] ) => (
				( arg ) => createElement( Provider, props, arg )
			) )
		);

		return createEditorElement( children );
	}
}

EditorProvider.childContextTypes = {
	editor: noop,
};

export default EditorProvider;
