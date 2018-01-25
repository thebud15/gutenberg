/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { format } from '@wordpress/date';

/**
 * Internal dependencies
 */
import './style.scss';
import InspectorControls from '../../inspector-controls';
import RadioControl from '../../inspector-controls/radio-control';

const now = new Date();
const formats = {
	short: __( 'F j, Y' ),
	long: __( 'l, F j, Y' ),
	numeric: __( 'm/d/Y' ),
	iso8601: 'Y-m-d',
};

export const name = 'core/post-date';

export const settings = {
	title: __( 'Publish Date' ),

	description: __( 'When your post is published.' ),

	icon: 'calendar',

	category: 'layout',

	useOnce: true,

	attributes: {
		format: {
			type: 'string',
			default: 'short',
		},
	},

	edit( { className, focus, attributes, setAttributes } ) {
		return [
			focus && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Date Settings' ) }</h3>
					<RadioControl
						label={ __( 'Format' ) }
						selected={ attributes.format }
						onChange={ ( attribute ) => setAttributes( { format: attribute } ) }
						options={ [
							...map( formats, ( value, optionName ) => ( { label: format( value, now ), value: optionName } ) ),
							{ label: __( 'Custom: to Do' ), value: 'custom' },
						] }
					/>
				</InspectorControls>
			),
			<div key="content" className={ className }>
				{
					attributes.format === 'custom' ?
						'To Do' :
						format( formats[ attributes.format ], now )
				}
			</div>,
		];
	},

	save() {
		return null;
	},
};
