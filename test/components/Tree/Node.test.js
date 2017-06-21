import React from 'react';

import { mount } from 'enzyme';

import Node from '../../../react-src/components/Tree/Node';

describe("Tree <Node />", ()=>{

    let props = {};
    let enzymeWrapper = {};

    beforeEach(()=>{
        props = {
            itemName: "",
            handleChangeSelectedFilter: jest.fn(),
            filterFieldName: "location",
            filters: {}
        };
    });
});