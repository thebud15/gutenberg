/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelColor, withAPIData } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockAlignmentToolbar from '../../block-alignment-toolbar';
import BlockControls from '../../block-controls';
import ColorPalette from '../../color-palette';
import InspectorControls from '../../inspector-controls';
import RangeControl from '../../inspector-controls/range-control';

const withSiteTitle = compose(
	withAPIData( () => ( {
		options: '/',
	} ) ),
	( Component ) => (
		( { options, ...props } ) => (
			<Component
				{ ...props }
				siteTitle={ get( options.data, [ 'name' ] ) }
			/>
		)
	)
);

export const name = 'core/site-title';

export const settings = {
	title: __( 'Site title' ),

	description: __( 'Introduce your site to the world.' ),

	icon: 'heading',

	category: 'widgets',

	keywords: [ __( 'site' ), __( 'title' ) ],

	supports: {
		html: false,
	},

	edit: withSiteTitle( ( { attributes, focus, setAttributes, siteTitle } ) => {
		const { align, backgroundColor, className, fontSize, textColor } = attributes;
		const style = {
			backgroundColor: backgroundColor,
			color: textColor,
			fontSize: fontSize ? fontSize + 'px' : undefined,
			textAlign: align,
		};

		return [
			focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					/>
				</BlockControls>
			),
			focus && <InspectorControls key="inspector">
				<PanelBody title={ __( 'Text Settings' ) }>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ fontSize || '' }
						onChange={ ( value ) => setAttributes( { fontSize: value } ) }
						min={ 20 }
						max={ 200 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
				</PanelBody>
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						value={ textColor }
						onChange={ ( colorValue ) => setAttributes( { textColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>,
			<h1
				key="heading"
				className={ className }
				style={ style }
			>
				{ siteTitle || __( 'Site title goes here.' ) }
			</h1>,
		];
	} ),

	save() {
		// TODO: May be better to save cached known site title as fallback in
		// the case that removal of the block at a later date is still useful
		// in static post content markup.
		return null;
	},
};
