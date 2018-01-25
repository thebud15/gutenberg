/**
 * External dependencies
 */
import { equal } from 'assert';

/**
 * Internal dependencies
 */
import inlineBlockCorrector from '../inline-block-corrector';
import { deepFilterHTML } from '../utils';

describe( 'inlineContentConverter', () => {
	it( 'should move inline-block content from paragraph', () => {
		equal(
			deepFilterHTML( '<p><strong>test<img></strong></p>', [ inlineBlockCorrector ] ),
			'<img><p><strong>test</strong></p>'
		);
	} );
} );
