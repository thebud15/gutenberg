/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
import {
	BlockInspector,
	PostTaxonomiesCheck,
	PostTaxonomies as PostTaxonomiesForm,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import SidebarHeader from './header';
import { getActivePanel } from '../../store/selectors';

function Sidebar( { panel } ) {
	return (
		<div className="edit-post-sidebar">
			<Panel>
				<SidebarHeader />
				{ panel === 'template' && (
					<PostTaxonomiesCheck>
						<PanelBody>
							<PostTaxonomiesForm />
						</PanelBody>
					</PostTaxonomiesCheck>
				) }
				{ panel === 'block' && (
					<PanelBody className="edit-post-block-inspector-panel">
						<BlockInspector />
					</PanelBody>
				) }
			</Panel>
		</div>
	);
}

export default connect(
	( state ) => ( {
		panel: getActivePanel( state ),
	} ),
	undefined,
	undefined,
	{ storeKey: 'edit-template' }
)( Sidebar );
