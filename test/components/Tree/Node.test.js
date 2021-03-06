import React from 'react';

import { mount } from 'enzyme';

import Node from '../../../react-src/components/Tree/Node';

import FiltersCollection from '../../../react-src/lib/FiltersCollection';

describe("Tree <Node />", ()=>{
    const INACTIVE_CLASS = "khb-treelist-node";
    const ACTIVE_CLASS =  "khb-treelist-activenode";

    const ACTIVE_ITEM_NAME = "ActiveNodeItem";
    let props = {};
    let enzymeWrapper = {};
    let filtersColl = {};

    beforeEach(()=>{
        filtersColl = new FiltersCollection();

        filtersColl.add(ACTIVE_ITEM_NAME, ACTIVE_ITEM_NAME);
    });

    test("gets hydrated correctly with an INACTIVE element", ()=>{
        const ITEM_NAME = "InactiveNodeItem";
        const FILTER_FIELD_NAME = "SomethingInactive";
        const props = {
            itemName: ITEM_NAME,
            handleChangeSelectedFilter: jest.fn(),
            filterFieldName: FILTER_FIELD_NAME,
            filters: filtersColl
        };

        const enzymeWrapper = mount(<Node {...props}/>);

        const div = enzymeWrapper.find('div');
        expect(div.exists()).toBe(true);
        expect(div.prop('data-filter-content')).toBe(ITEM_NAME);
        expect(div.prop('data-filter-field')).toBe(FILTER_FIELD_NAME);
        expect(div.hasClass(INACTIVE_CLASS)).toBe(true);
        expect(div.hasClass(ACTIVE_CLASS)).toBe(false);
        expect(div.text()).toBe(ITEM_NAME);
        expect(props.handleChangeSelectedFilter.mock.calls.length).toBe(0);
        div.props().onClick();
        expect(props.handleChangeSelectedFilter.mock.calls.length).toBe(1);
    });

    test("gets hydrated correctly with an ACTIVE element", ()=>{
        const props = {
            itemName: ACTIVE_ITEM_NAME,
            handleChangeSelectedFilter: jest.fn(),
            filterFieldName: ACTIVE_ITEM_NAME,
            filters: filtersColl
        };

        const enzymeWrapper = mount(<Node {...props}/>);

        const div = enzymeWrapper.find('div');
        expect(div.exists()).toBe(true);
        expect(div.prop('data-filter-content')).toBe(ACTIVE_ITEM_NAME);
        expect(div.prop('data-filter-field')).toBe(ACTIVE_ITEM_NAME);
        expect(div.hasClass(INACTIVE_CLASS)).toBe(true);
        expect(div.hasClass(ACTIVE_CLASS)).toBe(true);
        expect(div.text()).toBe(ACTIVE_ITEM_NAME);
        expect(props.handleChangeSelectedFilter.mock.calls.length).toBe(0);
        div.props().onClick();
        expect(props.handleChangeSelectedFilter.mock.calls.length).toBe(1);
    });
});