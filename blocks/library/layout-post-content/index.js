/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import InspectorControls from '../../inspector-controls';
import RadioControl from '../../inspector-controls/radio-control';

export const name = 'core/post-content';

export const settings = {
	title: __( 'Post Content' ),

	description: __( 'Whatever your heart’s desire.' ),

	icon: 'text',

	category: 'layout',

	useOnce: true,

	attributes: {
		excerpt: {
			type: 'string',
			default: 'true',
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

		return [
			focus && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Post Content Settings' ) }</h3>
					<RadioControl
						label={ __( 'Content to Show' ) }
						selected={ attributes.excerpt }
						onChange={ ( excerpt ) => setAttributes( { excerpt } ) }
						options={ [
							{ label: __( 'Full Post Content' ), value: 'false' },
							{ label: __( 'Excerpt' ), value: 'true' },
						] }
					/>
				</InspectorControls>
			),
			<div key="content" className={ className }>
				<DummyText />
				{ attributes.excerpt === 'true' ? null : <DummyText /> }
			</div>,
		];
	},

	save() {
		return null;
	},
};
