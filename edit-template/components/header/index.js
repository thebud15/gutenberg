/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { IconButton } from '@wordpress/components';
import {
	EditorHistoryRedo,
	EditorHistoryUndo,
	Inserter,
	MultiBlocksSwitcher,
	NavigableToolbar,
	PostPublishButton,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toggleSidebar } from '../../store/actions';
import { isSidebarOpened } from '../../store/selectors';

function Header( props ) {
	return (
		<div
			role="region"
			aria-label={ __( 'Editor toolbar' ) }
			className="edit-post-header"
			tabIndex="-1"
		>
			<NavigableToolbar
				className="edit-post-header-toolbar"
				aria-label={ __( 'Editor Toolbar' ) }
			>
				<Inserter position="bottom right" />
				<EditorHistoryUndo />
				<EditorHistoryRedo />
				<MultiBlocksSwitcher />
			</NavigableToolbar>
			<div className="edit-post-header__settings">
				<PostPublishButton />
				<IconButton
					icon="admin-generic"
					label={ __( 'Settings' ) }
					isToggled={ props.isSidebarOpened }
					onClick={ props.toggleSidebar }
				/>
			</div>
		</div>
	);
}

export default connect(
	( state ) => ( {
		isSidebarOpened: isSidebarOpened( state ),
	} ),
	{ toggleSidebar },
	undefined,
	{ storeKey: 'edit-template' }
)( Header );
