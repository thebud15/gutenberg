
/**
 * Returns an action object used in signalling that the user toggled the
 * sidebar.
 *
 * @returns {Object} Action object.
 */
export function toggleSidebar() {
	return {
		type: 'TOGGLE_SIDEBAR',
	};
}

/**
 * Returns an action object used in signalling that the user switched the active
 * sidebar tab panel.
 *
 * @param {string} panel The panel name.
 *
 * @returns {Object} Action object.
 */
export function setActivePanel( panel ) {
	return {
		type: 'SET_ACTIVE_PANEL',
		panel,
	};
}
