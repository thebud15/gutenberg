/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import InnerBlocks from '../../inner-blocks';

export const name = 'core/page';

export const settings = {
	title: __( 'Page' ),

	icon: 'layout',

	category: 'layout',

	attributes: {},

	edit( { className } ) {
		return [
			<div className={ className } key="container">
				<InnerBlocks />
			</div>,
		];
	},

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
};
