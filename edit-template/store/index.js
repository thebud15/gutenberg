/**
 * WordPress Dependencies
 */
import { registerReducer, withRehydratation } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';

/**
 * Module Constants
 */
const MODULE_KEY = 'core/edit-template';

const store = registerReducer( MODULE_KEY, withRehydratation( reducer, 'preferences' ) );

export default store;
