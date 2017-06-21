
import React from 'react';

import { mount } from 'enzyme';

import TreeSublist from '../../../react-src/components/Tree/TreeSublist';

import FiltersCollection from '../../../react-src/lib/FiltersCollection';

describe("Tree <TreeSublist />", ()=>{
    let filtersColl = {};
    beforeEach(()=>{
        filtersColl = new FiltersCollection();

        filtersColl.add("FILTER_KEY", "FILTER_NAME");
    });

    test("hydrates an ACTIVE(minus) sublist that is then DEACTIVATED(plus)", ()=>{
        const props = {
            listData: ['ItemOne', 'ItemTwo'],
            listTitle: "Test Sublist",
            filters: filtersColl,
            filterFieldName: "INACTIVE_FILTER_NAME",
            handleChangeSelectedFilter: jest.fn(),
            searchString: "TEST SEARCH STRING"
        };

        const enzymeWrapper = mount(<TreeSublist {...props}/>);

        const div = enzymeWrapper.find('div.khb-treelist-subtree-container');
        const i = div.find('i');
        expect(i.exists()).toBe(true);
        expect(i.hasClass('fa-minus-circle')).toBe(true);

        i.props().onClick();
        expect(i.hasClass('fa-plus-circle')).toBe(true);

        const ul = div.find('ul');
        expect(ul.exists()).toBe(true);

    });
});