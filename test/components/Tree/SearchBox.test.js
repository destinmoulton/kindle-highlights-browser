
import { mount } from 'enzyme';

import SearchBox from '../../../react-src/components/Tree/SearchBox.js';

describe('Tree/SearchBox Component', ()=>{
    let props = {};
    let enzymeWrapper = {};
    beforeEach(()=>{
        props = {
            handleSearchChange: jest.fn(),
            originalSearchString: "Mobius",
            handleClearSearch: jest.fn()
        };

        enzymeWrapper = mount(<SearchBox {...props}/>)
    });

    
});