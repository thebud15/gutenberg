<?php
/**
 * Server-side rendering of the `core/page` block.
 *
 * @package gutenberg
 */

/**
 * Renders the `core/page` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content surrounded by wp_head and wp_footer.
 */
function gutenberg_render_block_core_page( $attributes, $content, $inner_blocks ) {
	$serialized_inner_blocks = implode( ' ', array_map(
		'gutenberg_render_block',
		$inner_blocks
	) );

	return sprintf(
		'%s<div class="wp-block-page">%s</div>%s',
		gutenberg_get_head(),
		$serialized_inner_blocks,
		gutenberg_get_footer()
	);
}

function gutenberg_get_head() {
	ob_start();
	wp_head();
	$head = ob_get_contents();
	error_log( $head );
	ob_end_clean();
	return $head;
}

function gutenberg_get_footer() {
	ob_start();
	wp_footer();
	$head = ob_get_contents();
	error_log( $head );
	ob_end_clean();
	return $head;
}

//register_block_type( 'core/page', array(
//	'attributes'      => array(),
//	'render_callback' => 'gutenberg_render_block_core_page',
//) );
