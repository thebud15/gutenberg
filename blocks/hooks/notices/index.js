/**
 * External dependencies
 */
import uuid from 'uuid/v4';

/**
 * WordPress dependencies
 */
import { Component, getWrapperDisplayName } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { NoticeList } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { hasBlockSupport } from '../../api';
import './editor.scss';

/**
 * Override the default edit UI to include notices if supported.
 *
 * @param   {function|Component} BlockEdit Original component.
 * @returns {Component}                    Wrapped component.
 */
export function withNotices( BlockEdit ) {
	class WrappedBlockEdit extends Component {
		/** @inheritdoc */
		constructor() {
			super( ...arguments );

			this.addNotice = this.addNotice.bind( this );
			this.removeNotice = this.removeNotice.bind( this );

			this.state = {
				notices: [],
			};
		}

		/**
		* Function passed down to blocks as a prop that adds a new notice.
		*
		* @param {Object} notice  Notice to add.
		*/
		addNotice( notice ) {
			const noticeToAdd = notice.id ? notice : { ...notice, id: uuid() };
			this.setState( state => ( {
				notices: [ ...state.notices, noticeToAdd ],
			} ) );
		}

		/**
		* Removes a notice by id.
		*
		* @param {string} id  Id of the notice to remove.
		*/
		removeNotice( id ) {
			this.setState( state => ( {
				notices: state.notices.filter( notice => notice.id !== id ),
			} ) );
		}

		/** @inheritdoc */
		render() {
			if ( ! hasBlockSupport( this.props.name, 'notices' ) ) {
				return <BlockEdit key="block-edit" { ...this.props } />;
			}
			const noticesUI = <NoticeList key="block-notices" className="block-notices" notices={ this.state.notices } onRemove={ this.removeNotice } />;
			const createErrorNotice = ( msg ) => this.addNotice( { status: 'error', content: msg } );
			const notices = {
				UI: noticesUI,
				createNotice: this.addNotice,
				createErrorNotice,
			};
			return (
				<BlockEdit key="block-edit"
					{ ...this.props }
					notices={ notices } />
			);
		}
	}
	WrappedBlockEdit.displayName = getWrapperDisplayName( BlockEdit, 'notices' );

	return WrappedBlockEdit;
}

addFilter( 'blocks.BlockEdit', 'core/notices', withNotices );
