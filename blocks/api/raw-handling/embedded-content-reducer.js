/**
 * Internal dependencies
 */
import { isEmbedded } from './utils';

/**
 * Browser dependencies
 */
const { ELEMENT_NODE } = window.Node;

/**
 * This filter takes embedded content out of paragraphs.
 *
 * @param {Node} node The node to filter.
 *
 * @return {void}
 */
export default function( node ) {
	if ( node.nodeType !== ELEMENT_NODE ) {
		return;
	}

	if ( ! isEmbedded( node ) ) {
		return;
	}

	// Consider parent anchor part of the embedded content.
	const targetNode = node.parentElement.nodeName === 'A' ? node.parentElement : node;

	let wrapper = targetNode;

	while ( wrapper && wrapper.nodeName !== 'P' ) {
		wrapper = wrapper.parentElement;
	}

	if ( wrapper ) {
		wrapper.parentNode.insertBefore( targetNode, wrapper );
	}
}
