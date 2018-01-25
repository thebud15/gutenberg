<?php

function gutenberg_core_post_content_render( $attributes ) {
	global $post;

	return $post->post_content;
}

register_block_type( 'core/post-content', array(
	'render_callback' => 'gutenberg_core_post_content_render',
) );
