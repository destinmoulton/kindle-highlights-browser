import path from 'path';

import _ from 'lodash';

import MyClippingsParser from '../react-src/lib/MyClippingsParser';
import EXPECTED_CLIPPINGS from './data/MyClippings.expected';


const TEST_FILE = path.resolve(__dirname + '/data/', 'MyClippings.test.txt');

test("parses a test clips file", ()=>{
    const myClippingsParser = new MyClippingsParser();
    
    const clippings = myClippingsParser.parseFile(TEST_FILE);
    const clippingsJSON = JSON.stringify(clippings);
    expect(clippingsJSON).toBe(EXPECTED_CLIPPINGS);
});

describe("determineAuthorName parses the author's name", ()=>{
    const EXPECTED_ONEPART_NAME = "Prince";
    const EXPECTED_TWOPART_NAME = "Jason Bourne";
    const EXPECTED_UNDEFINED_NAME = "";
    let myClippingsParser = {};
    beforeEach(()=>{
        myClippingsParser = new MyClippingsParser();
    });
    
    test('last, first', ()=>{
        const testName = "Bourne, Jason";
        expect(myClippingsParser.determineAuthorName(testName)).toBe(EXPECTED_TWOPART_NAME);
    });

    test('first last', ()=>{
        const testName = "Jason Bourne";
        expect(myClippingsParser.determineAuthorName(testName)).toBe(EXPECTED_TWOPART_NAME);
    });

    test('one-name', ()=>{
        const testName = "Prince";
        expect(myClippingsParser.determineAuthorName(testName)).toBe(EXPECTED_ONEPART_NAME);
    });

    test('no-name', ()=>{
        const testName = "";
        expect(myClippingsParser.determineAuthorName(testName)).toBe(EXPECTED_UNDEFINED_NAME);
    })
});

describe("parseLocationAndDate parses the location and date/time", ()=>{
   
    let myClippingsParser = {};
    beforeEach(()=>{
        myClippingsParser = new MyClippingsParser();
    });
    
    test('bookmark', ()=>{
        const bookmarkStr = "- Your Bookmark on Location 1515 | Added on Monday, May 19, 2014 5:37:57 PM";
        const expectedObject = {
            location: {
                type: "bookmark",
                value: "1515"
            },
            location_start: 1515,
            unix_timestamp: 1400542677
        };
        const parsedObject = myClippingsParser.parseLocationAndDate(bookmarkStr);
        expect(parsedObject.location.type).toBe(expectedObject.location.type);
        expect(parsedObject.location.value).toBe(expectedObject.location.value);
        expect(parsedObject.location_start).toBe(expectedObject.location_start);
        expect(parsedObject.unix_timestamp).toBe(expectedObject.unix_timestamp);
    });

    test('highlight', ()=>{
        const highlightStr = "- Your Highlight on Location 523-525 | Added on Tuesday, March 28, 2017 6:04:00 AM";
        const expectedObject = {
            location: {
                type: "highlight",
                value: "523-525"
            },
            location_start: 523,
            unix_timestamp: 1490702640
        };
        const parsedObject = myClippingsParser.parseLocationAndDate(highlightStr);
        expect(parsedObject.location.type).toBe(expectedObject.location.type);
        expect(parsedObject.location.value).toBe(expectedObject.location.value);
        expect(parsedObject.location_start).toBe(expectedObject.location_start);
        expect(parsedObject.unix_timestamp).toBe(expectedObject.unix_timestamp);
    });

    test('note', ()=>{
        const noteStr = "- Your Note on Location 1675 | Added on Tuesday, June 2, 2015 7:22:56 AM";
        const expectedObject = {
            location: {
                type: "note",
                value: "1675"
            },
            location_start: 1675,
            unix_timestamp: 1433251376
        };
        const parsedObject = myClippingsParser.parseLocationAndDate(noteStr);
        expect(parsedObject.location.type).toBe(expectedObject.location.type);
        expect(parsedObject.location.value).toBe(expectedObject.location.value);
        expect(parsedObject.location_start).toBe(expectedObject.location_start);
        expect(parsedObject.unix_timestamp).toBe(expectedObject.unix_timestamp);
    });

    test('highlight denoted by page', ()=>{
        const pageStr = "- Your Highlight on page 35 | Location 759-760 | Added on Friday, September 26, 2014 5:57:02 PM";
        const expectedObject = {
            location:{
                type: "highlight",
                value: "759-760"
            },
            location_start: 759,
            unix_timestamp: 1411775822
        };
        const parsedObject = myClippingsParser.parseLocationAndDate(pageStr);
        expect(parsedObject.location.type).toBe(expectedObject.location.type);
        expect(parsedObject.location.value).toBe(expectedObject.location.value);
        expect(parsedObject.location_start).toBe(expectedObject.location_start);
        expect(parsedObject.unix_timestamp).toBe(expectedObject.unix_timestamp);
    })
});