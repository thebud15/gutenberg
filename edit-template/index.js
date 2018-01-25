/**
 * External dependencies
 */
import { connect, createProvider } from 'react-redux';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { IconButton, Popover, Panel } from '@wordpress/components';
import {
	BlockInspector,
	BlockList,
	DefaultBlockAppender,
	EditorHistoryRedo,
	EditorHistoryUndo,
	EditorNotices,
	EditorProvider,
	Inserter,
	MultiBlocksSwitcher,
	NavigableToolbar,
	PostPreviewButton,
	PostPublishButton,
	PostTitle,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import store from './store';
import { toggleSidebar } from './store/actions';
import { isSidebarOpened } from './store/selectors';

export function initializeEditor( id, post, settings ) {
	const target = document.getElementById( id );

	const TemplateProvider = createProvider( 'edit-template' );

	render(
		<EditorProvider settings={ settings } post={ post }>
			<TemplateProvider store={ store }>
				<Layout />
			</TemplateProvider>
		</EditorProvider>,
		target
	);
}

const applyLayoutConnect = connect(
	( state ) => ( {
		showSidebar: isSidebarOpened( state ),
	} ),
	undefined,
	undefined,
	// Temporary:
	{ storeKey: 'edit-template' }
);

const Layout = applyLayoutConnect( ( { showSidebar } ) => (
	<div className="edit-post-layout">
		{ /*<UnsavedChangesWarning /> */ }
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
) );

const applyHeaderConnect = connect(
	( state ) => ( {
		isSidebarOpened: isSidebarOpened( state ),
	} ),
	{ toggleSidebar },
	undefined,
	{ storeKey: 'edit-template' }
);
const Header = applyHeaderConnect( ( props ) => {
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
				<TemplateSavedState />
				<PostPublishButton />
				<TemplatePreviewButton />
				<IconButton
					icon="admin-generic"
					label={ __( 'Settings' ) }
					isToggled={ props.isSidebarOpened }
					onClick={ props.toggleSidebar }
				/>
			</div>
		</div>
	);
} );

function Sidebar() {
	return (
		<div className="edit-post-sidebar">
			<Panel>
				<BlockInspector />
			</Panel>
		</div>
	);
}

function TemplateSavedState() {
	return null;
}
function TemplatePreviewButton() {
	return <PostPreviewButton />;
}
