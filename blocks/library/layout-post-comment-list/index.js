/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import InspectorControls from '../../inspector-controls';
import ToggleControl from '../../inspector-controls/toggle-control';
import TextControl from '../../inspector-controls/text-control';

export const name = 'core/post-comment-list';

export const settings = {
	title: __( 'Comment List' ),

	description: __( 'What people are saying about you.' ),

	icon: 'admin-comments',

	category: 'layout',

	useOnce: true,

	attributes: {
		allowNew: {
			type: 'boolean',
			default: true,
		},
		nestingLevel: {
			type: 'number',
			default: 5,
		},
	},

	edit( { className, focus, attributes, setAttributes } ) {
		const DummyText = () => {
			return (
				<div>
					{ [ 10, 15, 10, 4, 9, 16, 20, 7, 5, 14, 12 ].map( ( length, i ) => [
						<span key={ i }>{ '–'.repeat( length ) }</span>,
						' ',
					] ) }
				</div>
			);
		};

		const Comment = () => (
			<div>
				<div className="wp-block-post-comment-list__avatar" />
				<DummyText />
			</div>
		);

		return [
			focus && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Comment Settings' ) }</h3>
					<ToggleControl
						label={ __( 'Allow new replies on site' ) }
						checked={ !! attributes.allowNew }
						onChange={ () => setAttributes( { allowNew: ! attributes.allowNew } ) }
					/>
					<TextControl
						label={ __( 'Nesting level' ) }
						type="number"
						min="0"
						max="10"
						value={ attributes.nestingLevel }
						onChange={ ( level ) => setAttributes( { nestingLevel: level } ) }
					/>
				</InspectorControls>
			),
			<div key="content" className={ className }>
				<Comment />
				<Comment />
			</div>,
		];
	},

	save() {
		return null;
	},
};
