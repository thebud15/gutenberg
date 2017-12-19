/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { registerBlockType, getBlockTypes, unregisterBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { VisualEditorInserter } from '../inserter';

describe( 'VisualEditorInserter', () => {
	beforeAll( () => {
		registerBlockType( 'core/foo', {
			title: 'Foo',
			category: 'common',
			save: noop,
		} );

		registerBlockType( 'core/bar', {
			title: 'Bar',
			category: 'common',
			save: noop,
		} );
	} );

	afterAll( () => {
		getBlockTypes().forEach( block => {
			unregisterBlockType( block.name );
		} );
	} );

	it( 'should show controls when receiving focus', () => {
		const wrapper = shallow( <VisualEditorInserter /> );

		wrapper.simulate( 'focus' );

		expect( wrapper.state( 'isShowingControls' ) ).toBe( true );
	} );

	it( 'should hide controls when losing focus', () => {
		const wrapper = shallow( <VisualEditorInserter /> );

		wrapper.simulate( 'focus' );
		wrapper.simulate( 'blur' );

		expect( wrapper.state( 'isShowingControls' ) ).toBe( false );
	} );

	it( 'should display frequently used blocks', () => {
		const onInsertBlock = jest.fn();
		const wrapper = shallow(
			<VisualEditorInserter
				onInsertBlock={ onInsertBlock }
				frequentlyUsedBlockNames={ [ 'core/foo', 'core/bar' ] } />
		);

		const buttons = wrapper.find( 'IconButton' );
		expect( buttons ).toHaveLength( 3 );
		expect( buttons.at( 0 ).children().text() ).toBe( 'Foo' );
		expect( buttons.at( 1 ).children().text() ).toBe( 'Bar' );
		expect( buttons.at( 2 ).children().text() ).toBe( 'Paragraph' );
	} );

	it( 'should omit non-existing frequently used block', () => {
		const onInsertBlock = jest.fn();
		const wrapper = shallow(
			<VisualEditorInserter
				onInsertBlock={ onInsertBlock }
				frequentlyUsedBlockNames={ [ 'core/foo', 'core/bar', 'core/qux' ] } />
		);

		const buttons = wrapper.find( 'IconButton' );
		expect( buttons ).toHaveLength( 3 );
		expect( buttons.at( 0 ).children().text() ).toBe( 'Foo' );
		expect( buttons.at( 1 ).children().text() ).toBe( 'Bar' );
		expect( buttons.at( 2 ).children().text() ).toBe( 'Paragraph' );
	} );

	it( 'should omit unallowed frequently used block', () => {
		const onInsertBlock = jest.fn();
		const wrapper = shallow(
			<VisualEditorInserter
				onInsertBlock={ onInsertBlock }
				frequentlyUsedBlockNames={ [ 'core/foo', 'core/bar', 'core/qux' ] }
				allowedBlockTypes={ [ 'core/foo' ] } />
		);

		const buttons = wrapper.find( 'IconButton' );
		expect( buttons ).toHaveLength( 1 );
		expect( buttons.at( 0 ).children().text() ).toBe( 'Foo' );
	} );

	it( 'should insert frequently used blocks', () => {
		const onInsertBlock = jest.fn();
		const wrapper = shallow(
			<VisualEditorInserter onInsertBlock={ onInsertBlock } />
		);

		wrapper
			.findWhere( ( node ) => node.prop( 'children' ) === 'Paragraph' )
			.simulate( 'click' );

		expect( onInsertBlock ).toHaveBeenCalled();
		expect( onInsertBlock.mock.calls[ 0 ][ 0 ].name ).toBe( 'core/paragraph' );
	} );
} );
