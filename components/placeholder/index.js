/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';
import Dashicon from '../dashicon';

/**
* Renders a placeholder. Normally used by blocks to render their empty state.
*
* @param   {Object} props The component props.
* @returns {Object}       The rendered placeholder.
*/
function Placeholder( { icon, children, label, instructions, className, notices, ...additionalProps } ) {
	const classes = classnames( 'components-placeholder', className );

	return (
		<div { ...additionalProps } className={ classes }>
			<div className="components-placeholder__label">
				{ !! icon && <Dashicon icon={ icon } /> }
				{ label }
			</div>
			{ !! instructions && <div className="components-placeholder__instructions">{ instructions }</div> }
			<div className="components-placeholder__fieldset">
				{ children }
			</div>
			{ !! notices && notices }
		</div>
	);
}

export default Placeholder;
