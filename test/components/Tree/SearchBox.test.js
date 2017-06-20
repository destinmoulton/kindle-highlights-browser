import React from 'react';

import { mount } from 'enzyme';

import SearchBox from '../../../react-src/components/Tree/SearchBox.js';

describe('Tree/SearchBox Component', ()=>{
    const SEARCH_STRING = "Mobius Strip";
    let props = {};
    let enzymeWrapper = {};
    beforeEach(()=>{
        props = {
            handleSearchChange: jest.fn(),
            originalSearchString: SEARCH_STRING,
            handleClearSearch: jest.fn()
        };

        enzymeWrapper = mount(<SearchBox {...props}/>)
    });

    test("should render the search text input box with search string", ()=>{
        const formControl = enzymeWrapper.find('input.form-control');
        expect(formControl.exists()).toBe(true);
        expect(formControl.prop('value')).toBe(SEARCH_STRING);
    });

    describe("clear/X icon", ()=>{
        test("icon/button is X and set to clear function when search text is set", ()=>{
            const iconWrapper = enzymeWrapper.find('span.input-group-addon');
            expect(iconWrapper.exists()).toBe(true);
            expect(iconWrapper.hasClass("khb-treelist-search-close-icon")).toBe(true);

            const icon = iconWrapper.find('i');
            expect(icon.exists()).toBe(true);
            expect(icon.hasClass("fa-times")).toBe(true);

            expect(props.handleClearSearch.mock.calls.length).toBe(0);
            icon.props().onClick();
            expect(props.handleClearSearch.mock.calls.length).toBe(1);

        })
    });
});