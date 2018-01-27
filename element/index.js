/**
 * External dependencies
 */
import { createElement, Component, cloneElement, Children, Fragment } from 'react';
import { render, findDOMNode, createPortal, unmountComponentAtNode } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { camelCase, flowRight, isString, upperFirst } from 'lodash';

/**
 * Returns a new element of given type. Type can be either a string tag name or
 * another function which itself returns an element.
 *
 * @param {?(string|Function)} type     Tag name or element creator
 * @param {Object}             props    Element properties, either attribute
 *                                       set to apply to DOM node or values to
 *                                       pass through to element creator
 * @param {...WPElement}       children Descendant elements
 *
 * @returns {WPElement} Element.
 */
export { createElement };

/**
 * Renders a given element into the target DOM node.
 *
 * @param {WPElement} element Element to render
 * @param {Element}   target  DOM node into which element should be rendered
 */
export { render };

/**
 * Removes any mounted element from the target DOM node.
 *
 * @param {Element} target DOM node in which element is to be removed
 */
export { unmountComponentAtNode };

/**
 * A base class to create WordPress Components (Refs, state and lifecycle hooks)
 */
export { Component };

/**
 * Creates a copy of an element with extended props.
 *
 * @param {WPElement} element Element
 * @param {?Object}   props   Props to apply to cloned element
 *
 * @returns {WPElement} Cloned element.
 */
export { cloneElement };

/**
 * Finds the dom node of a React component
 *
 * @param {Component} component component's instance
 * @param {Element}   target    DOM node into which element should be rendered
 */
export { findDOMNode };

export { Children };

/**
 * A component which renders its children without any wrapping element.
 */
export { Fragment };

/**
 * Creates a portal into which a component can be rendered.
 *
 * @see https://github.com/facebook/react/issues/10309#issuecomment-318433235
 *
 * @param {Component} component Component
 * @param {Element}   target    DOM node into which element should be rendered
 */
export { createPortal };

/**
 * Renders a given element into a string.
 *
 * @param {WPElement} element Element to render
 *
 * @returns {String} HTML.
 */
export function renderToString( element ) {
	let rendered = renderToStaticMarkup( element );

	// Drop raw HTML wrappers (support dangerous inner HTML without wrapper)
	rendered = rendered.replace( /<\/?wp-dangerous-html>/g, '' );

	return rendered;
}

/**
 * Concatenate two or more React children objects.
 *
 * @param {...?Object} childrenArguments Array of children arguments (array of arrays/strings/objects) to concatenate.
 *
 * @returns {Array} The concatenated value.
 */
export function concatChildren( ...childrenArguments ) {
	return childrenArguments.reduce( ( memo, children, i ) => {
		Children.forEach( children, ( child, j ) => {
			if ( child && 'string' !== typeof child ) {
				child = cloneElement( child, {
					key: [ i, j ].join(),
				} );
			}

			memo.push( child );
		} );

		return memo;
	}, [] );
}

/**
 * Switches the nodeName of all the elements in the children object.
 *
 * @param {?Object} children Children object.
 * @param {string}  nodeName Node name.
 *
 * @returns {?Object} The updated children object.
 */
export function switchChildrenNodeName( children, nodeName ) {
	return children && Children.map( children, ( elt, index ) => {
		if ( isString( elt ) ) {
			return createElement( nodeName, { key: index }, elt );
		}
		const { children: childrenProp, ...props } = elt.props;
		return createElement( nodeName, { key: index, ...props }, childrenProp );
	} );
}

/**
 * Composes multiple higher-order components into a single higher-order component. Performs right-to-left function
 * composition, where each successive invocation is supplied the return value of the previous.
 *
 * @param {...Function} hocs The HOC functions to invoke.
 *
 * @returns {Function} Returns the new composite function.
 */
export { flowRight as compose };

/**
 * Returns a wrapped version of a React component's display name.
 * Higher-order components use getWrapperDisplayName().
 *
 * @param {Function|Component} BaseComponent Used to detect the existing display name.
 * @param {string} wrapperName Wrapper name to prepend to the display name.
 *
 * @returns {string} Wrapped display name.
 */
export function getWrapperDisplayName( BaseComponent, wrapperName ) {
	const { displayName = BaseComponent.name || 'Component' } = BaseComponent;

	return `${ upperFirst( camelCase( wrapperName ) ) }(${ displayName })`;
}

/**
 * Component used as equivalent of Fragment with unescaped HTML, in cases where
 * it is desirable to render dangerous HTML without needing a wrapper element.
 *
 * @param {string} props.children HTML to render.
 *
 * @returns {WPElement} Dangerously-rendering element.
 */
export function DangerousHTML( { children } ) {
	return <wp-dangerous-html children={ children } />;
}
