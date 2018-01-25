/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelColor } from '@wordpress/components';


/**
 * Internal dependencies
 */
import BlockAlignmentToolbar from '../../block-alignment-toolbar';
import BlockControls from '../../block-controls';
import ColorPalette from '../../color-palette';
import InspectorControls from '../../inspector-controls';
import RangeControl from '../../inspector-controls/range-control';

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

	edit( { attributes, focus, setAttributes } ) {
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
			>{ __( 'Site title goes here.' ) }</h1>,
		];
	},

	save() {
		return null;
	},
};
