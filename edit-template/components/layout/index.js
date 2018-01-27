/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import {
	BlockList,
	DefaultBlockAppender,
	EditorNotices,
	PostTitle,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Header from '../header';
import Sidebar from '../sidebar';
import { isSidebarOpened } from '../../store/selectors';

function Layout( { showSidebar } ) {
	return (
		<div className="edit-post-layout">
			<Header />
			<div className="edit-post-layout__content" role="region" aria-label={ __( 'Editor content' ) } tabIndex="-1">
				<EditorNotices />
				<div className="edit-post-layout__editor">
					<div className="edit-post-visual-editor">
						<PostTitle />
						<BlockList showContextualToolbar={ true } />
						<DefaultBlockAppender />
					</div>
				</div>
			</div>
			{ showSidebar && <Sidebar /> }
			<Popover.Slot />
		</div>
	);
}

export default connect(
	( state ) => ( {
		showSidebar: isSidebarOpened( state ),
	} ),
	undefined,
	undefined,
	{ storeKey: 'edit-template' }
)( Layout );
