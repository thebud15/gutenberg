<?php

function gutenberg_core_post_date_render( $attributes ) {
	$formats = array(
		'short' => __( 'F j, Y' ),
		'long' => __( 'l, F j, Y' ),
		'numeric' => __( 'm/d/Y' ),
		'iso8601' => 'Y-m-d',
	);

	$format = $formats[ 'short' ];

	if ( $attributes && $attributes[ 'format' ] ) {
		$format = $formats[ $attributes[ 'format' ] ];
	}

	return get_the_date( $format );
}

register_block_type( 'core/post-date', array(
	'render_callback' => 'gutenberg_core_post_date_render',
) );
