/**
 * External dependencies
 */
import { createProvider } from 'react-redux';

/**
 * WordPress dependencies
 */
import { EditorProvider } from '@wordpress/editor';
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import store from './store';
import Layout from './components/layout';

export function initializeEditor( id, post, settings ) {
	const target = document.getElementById( id );

	const TemplateProvider = createProvider( 'edit-template' );

	render(
		<EditorProvider settings={ settings } post={ post }>
			<TemplateProvider store={ store }>
				<Layout />
			</TemplateProvider>
		</EditorProvider>,
		target
	);
}

