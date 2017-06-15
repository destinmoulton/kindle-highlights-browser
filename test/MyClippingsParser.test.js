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