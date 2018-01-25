<?php

function gutenberg_core_post_navigation_render( $attributes ) {
	the_post_navigation();
}

register_block_type( 'core/post-navigation', array(
	'render_callback' => 'gutenberg_core_post_navigation_render',
) );
