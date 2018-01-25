/**
 * External dependencies
 */
import { map, mapValues } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import InspectorControls from '../../inspector-controls';
import ToggleControl from '../../inspector-controls/toggle-control';

const options = {
	facebook: __( 'Facebook' ),
	twitter: __( 'Twitter' ),
	email: __( 'Email' ),
};

export const name = 'core/post-sharing';

export const settings = {
	title: __( 'Post Sharing' ),

	description: __( 'Buttons to share your post.' ),

	icon: 'share',

	category: 'layout',

	useOnce: true,

	attributes: mapValues( options, () => ( {
		type: 'boolean',
		default: true,
	} ) ),

	edit( { className, focus, attributes, setAttributes } ) {
		return [
			focus && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Sharing Settings' ) }</h3>
					{ map( options, ( label, key ) =>
						<ToggleControl
							key={ key }
							label={ label }
							checked={ !! attributes[ key ] }
							onChange={ () => setAttributes( { [ key ]: ! attributes[ key ] } ) }
						/>
					) }
				</InspectorControls>
			),
			<div key="content" className={ className }>
				{ map( options, ( label, key ) =>
					attributes[ key ] && <IconButton key={ key } icon={ key } />
				) }
			</div>,
		];
	},

	save() {
		return null;
	},
};
