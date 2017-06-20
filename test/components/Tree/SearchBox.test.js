import React from 'react';

import { mount } from 'enzyme';

import SearchBox from '../../../react-src/components/Tree/SearchBox.js';

describe('Tree/SearchBox Component', ()=>{

    describe("search string is set", ()=>{
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
            let iconWrapper = {};
            let icon = {};

            beforeEach(()=>{
                iconWrapper = enzymeWrapper.find('span.input-group-addon');
                icon = iconWrapper.find('i');
            });

            test("wrapper exists and class is set", ()=>{
                expect(iconWrapper.exists()).toBe(true);
                expect(iconWrapper.hasClass("khb-treelist-search-close-icon")).toBe(true);
            });
            
            test("exists as i and X icon is set", ()=>{
                expect(icon.exists()).toBe(true);
                expect(icon.hasClass("fa-times")).toBe(true);
            });

            test("fires handleClearSearch fn when clicked", ()=>{
                expect(props.handleClearSearch.mock.calls.length).toBe(0);
                icon.props().onClick();
                expect(props.handleClearSearch.mock.calls.length).toBe(1);

            })
        });
    });
});