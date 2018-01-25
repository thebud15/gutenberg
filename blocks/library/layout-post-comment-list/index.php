<?php

function gutenberg_core_post_comment_list_render( $attributes ) {
	comments_template();
}

register_block_type( 'core/post-comment-list', array(
	'render_callback' => 'gutenberg_core_post_comment_list_render',
) );
