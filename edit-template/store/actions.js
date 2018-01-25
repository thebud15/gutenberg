
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
