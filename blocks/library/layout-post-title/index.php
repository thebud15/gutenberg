<?php

function gutenberg_core_post_title_render( $attributes ) {
	the_title();
}

register_block_type( 'core/post-title', array(
	'render_callback' => 'gutenberg_core_post_title_render',
) );
