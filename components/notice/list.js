/**
 * External depednencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import Notice from './';

/**
* Renders a list of notices.
*
* @param   {Object}   $0           Props passed to the component.
* @param   {Array}    $0.notices   Array of notices to render.
* @param   {Function} $0.onRemove  Function called when a notice should be removed / dismissed.
* @param   {Object}   $0.className Name of the class used by the component.
* @returns {Object}                The rendered notices list.
*/
function NoticeList( { notices, onRemove = noop, className = 'components-notice-list' } ) {
	const removeNotice = ( id ) => () => onRemove( id );

	return (
		<div className={ className }>
			{ [ ...notices ].reverse().map( ( notice ) => (
				<Notice { ...notice } key={ notice.id } onRemove={ removeNotice( notice.id ) } />
			) ) }
		</div>
	);
}

export default NoticeList;
