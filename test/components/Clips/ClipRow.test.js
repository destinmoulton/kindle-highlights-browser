import React from 'react';

import { mount } from 'enzyme';

import moment from 'moment';

import ClipRow from '../../../react-src/components/Clips/ClipRow';

describe("Clips <ClipRow />", ()=>{
    let TEXT = "TestClipContents.";
    let DATE = moment();
    let clip = {};
    beforeEach(()=>{
        clip = {
            text: TEXT,
            date: DATE
        };
    });

    test("highlight", ()=>{
        clip['location'] = {
            type: 'highlight',
            value: '1-10'
        };
        const props = { clip };
        const enzymeWrapper = mount(<ClipRow {...props}/>);

        const icon = enzymeWrapper.find('i');
        expect(icon.exists()).toBe(true);
        expect(icon.hasClass('fa-quote-left'));

        const loc = enzymeWrapper.find('span.khb-clipslist-cliploc');
        expect(loc.exists()).toBe(true);
        expect(loc.text()).toBe("Highlight at Location: 1-10");

        const date = enzymeWrapper.find('span.khb-clipslist-clipdate');
        expect(date.exists()).toBe(true);
        expect(date.text()).toBe(DATE.format("MMMM DD, YYYY h:mm:ss a"));

        const text = enzymeWrapper.find('div.khb-clipslist-cliptext');
        expect(text.exists()).toBe(true);
        expect(text.text()).toBe('"'+TEXT+'"');
    });

    test("note", ()=>{
        clip['location'] = {
            type: 'note',
            value: '1-10'
        };
        const props = { clip };
        const enzymeWrapper = mount(<ClipRow {...props}/>);

        const icon = enzymeWrapper.find('i');
        expect(icon.exists()).toBe(true);
        expect(icon.hasClass('fa-sticky-note-o'));

        const loc = enzymeWrapper.find('span.khb-clipslist-cliploc');
        expect(loc.exists()).toBe(true);
        expect(loc.text()).toBe("Note at Location: 1-10");

        const date = enzymeWrapper.find('span.khb-clipslist-clipdate');
        expect(date.exists()).toBe(true);
        expect(date.text()).toBe(DATE.format("MMMM DD, YYYY h:mm:ss a"));

        const text = enzymeWrapper.find('div.khb-clipslist-cliptext');
        expect(text.exists()).toBe(true);
        expect(text.text()).toBe(TEXT);
    });
});