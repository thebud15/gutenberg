/**
 * Browser dependencies
 */
const { userAgent } = window.navigator;

const isMac = userAgent.indexOf( 'Mac' ) !== -1;

export const BACKSPACE = 8;
export const TAB = 9;
export const ENTER = 13;
export const ESCAPE = 27;
export const SPACE = 32;
export const LEFT = 37;
export const UP = 38;
export const RIGHT = 39;
export const DOWN = 40;
export const DELETE = 46;

export const F10 = 121;

/**
 * Check if the meta key and the given character are presssed.
 *
 * @param  {KeyboardEvent} event     The event object.
 * @param  {String}        character The character to check.
 * @return {Boolean}                 True if the combination is pressed, false if not.
 */
export function isMeta( event, character ) {
	const meta = isMac ? 'Meta' : 'Ctrl';

	if ( ! event[ meta.toLowerCase() + 'Key' ] ) {
		return false;
	}

	if ( ! character ) {
		return event.key === meta;
	}

	return event.key === character;
}
