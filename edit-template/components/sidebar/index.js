/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
import {
	BlockInspector,
	PostTaxonomiesCheck,
	PostTaxonomies as PostTaxonomiesForm,
} from '@wordpress/editor';

function Sidebar() {
	return (
		<div className="edit-post-sidebar">
			<Panel>
				<PostTaxonomiesCheck>
					<PanelBody>
						<PostTaxonomiesForm />
					</PanelBody>
				</PostTaxonomiesCheck>
				<BlockInspector />
			</Panel>
		</div>
	);
}

export default Sidebar;
