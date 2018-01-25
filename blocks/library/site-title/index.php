<?php
/**
 * Server-side rendering of the `core/latest-posts` block.
 *
 * @package gutenberg
 */

/**
 * Renders the `core/site-title` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the site's title.
 */
function gutenberg_render_block_core_site_title( $attributes ) {
	$style_properties   = array_filter( array(
		'background-color' => $attributes['backgroundColor'] ? $attributes['backgroundColor'] : '',
		'color' => $attributes['textColor'] ? $attributes['textColor'] : '',
		'font-size' => $attributes['fontSize'] ? $attributes['fontSize'] . 'px' : '',
		'text-align' => $attributes['align'] ? $attributes['align'] : '',
	) );
	$style_definitions = [];
	foreach ( $style_properties as $property => $value ) {
		$style_definitions[] = $property . ':' . $value;
	}

	$header_attributes = array_filter( array(
		'className' => $attributes['className'] ? $attributes['className'] : '',
		'style' => count( $style_definitions ) > 0 ? implode( $style_definitions, ';' ) : ''
	) );
	$header_definitions = [];
	foreach ( $header_attributes as $html_attribute => $value ) {
		$header_definitions[] = sprintf( '%1$s="%2$s"', $html_attribute, esc_attr( $value ) );
	}

	return sprintf(
		'<h1%1$s>%2$s</h1>',
		count( $header_definitions ) > 0 ? ' ' . implode( $header_definitions, ' ' ) : '',
		esc_html( get_bloginfo( 'name' ) )
	);
}

register_block_type( 'core/site-title', array(
	'attributes'      => array(
		'align' => array(
			'type' => 'string',
		),
		'className' => array(
			'type' => 'string',
		),
		'fontSize'  => array(
			'type' => 'number',
		),
		'backgroundColor'  => array(
			'type' => 'string',
		),
		'textColor'  => array(
			'type' => 'string',
		),
	),
	'render_callback' => 'gutenberg_render_block_core_site_title',
) );
