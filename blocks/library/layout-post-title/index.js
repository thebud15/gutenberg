/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

export const name = 'core/post-title';

export const settings = {
	title: __( 'Post Title' ),

	description: __( 'What are you writing about?' ),

	icon: 'text',

	category: 'layout',

	useOnce: true,

	edit( { className } ) {
		return (
			<h1 className={ className }>
				<span>Post Title</span>
			</h1>
		);
	},

	save() {
		return null;
	},
};
