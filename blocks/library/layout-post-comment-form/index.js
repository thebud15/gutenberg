/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import InspectorControls from '../../inspector-controls';
import ToggleControl from '../../inspector-controls/toggle-control';
import TextControl from '../../inspector-controls/text-control';
import TextareaControl from '../../inspector-controls/textarea-control';

export const name = 'core/post-comment-form';

export const settings = {
	title: __( 'Comment Form' ),

	description: __( 'What people are saying about you.' ),

	icon: 'admin-comments',

	category: 'layout',

	useOnce: true,

	attributes: {
		allowNew: {
			type: 'boolean',
			default: true,
		},
		requireNameEmail: {
			type: 'boolean',
			default: true,
		},
	},

	edit( { className, focus, attributes, setAttributes } ) {
		return [
			focus && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Comment Settings' ) }</h3>
					<ToggleControl
						label={ __( 'Allow new replies on site' ) }
						checked={ !! attributes.allowNew }
						onChange={ () => setAttributes( { allowNew: ! attributes.allowNew } ) }
					/>
					<ToggleControl
						label={ __( 'Require name and email' ) }
						checked={ !! attributes.requireNameEmail }
						onChange={ () => setAttributes( { requireNameEmail: ! attributes.requireNameEmail } ) }
					/>
				</InspectorControls>
			),
			<div key="content" className={ className }>
				<h2>{ __( 'Leave a Comment' ) }</h2>
				<TextareaControl label={ __( 'Comment' ) } disabled />
				<TextControl label={ __( 'Name' ) } disabled />
				<TextControl label={ __( 'Email' ) } disabled />
				<TextControl label={ __( 'Site' ) } disabled />
				<Button isPrimary>{ __( 'Submit' ) }</Button>
			</div>,
		];
	},

	save() {
		return null;
	},
};
