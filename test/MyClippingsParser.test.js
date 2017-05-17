import path from 'path';
import MyClippingsParser from '../react-src/lib/MyClippingsParser';

import EXPECTED_CLIPPINGS from './data/MyClippings.expected';

const TEST_FILE = path.resolve(__dirname + '/data/', 'MyClippings.test.txt');

test("parses a test clips file", ()=>{
    const myClippingsParser = new MyClippingsParser();
    
    const clippings = myClippingsParser.parseFile(TEST_FILE);
    const clippingsJSON = JSON.stringify(clippings);
    expect(clippingsJSON).toBe(EXPECTED_CLIPPINGS);
});