/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state          Current state.
 * @param {boolean} state.sidebar  Whether the sidebar is opened or closed.
 * @param {Object}  action         Dispatched action.
 *
 * @returns {string} Updated state.
 */
export function preferences( state = { sidebar: false }, action ) {
	switch ( action.type ) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				sidebar: ! state.sidebar,
			};
	}

	return state;
}

export function panel( state = 'template', action ) {
	switch ( action.type ) {
		case 'SET_ACTIVE_PANEL':
			return action.panel;
	}

	return state;
}

export default combineReducers( {
	preferences,
	panel,
} );
