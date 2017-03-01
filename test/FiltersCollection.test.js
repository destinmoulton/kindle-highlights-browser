/**
 * Test the lib/Filters.js file.
 */

import FiltersCollection from '../react-src/lib/FiltersCollection'

let filters = {};
beforeEach(()=>{
    filters = new FiltersCollection();
});
test("adds a basic filter", ()=>{
    const filterName = "cat";
    const filterContent = "tiger";

    filters.add(filterName, filterContent);

    expect(filters.has(filterName, filterContent)).toBe(true);
    expect(filters.length).toBe(1);
});
test("removes a basic filter", ()=>{
    const filterName = "cat";
    const filterContent = "bella";

    filters.add(filterName, filterContent);

    expect(filters.has(filterName, filterContent)).toBe(true);
    expect(filters.length).toBe(1);
    filters.remove(filterName, filterContent);
    expect(filters.has(filterName, filterContent)).toBe(false);
    expect(filters.length).toBe(0);
});
test("adds and removes a filter with random *dirty* characters", ()=>{
    const filterName = "cat";
    const filterContent = `'$%@!*()[oreo]`;

    filters.add(filterName, filterContent);

    expect(filters.has(filterName, filterContent)).toBe(true);
    expect(filters.length).toBe(1);
    filters.remove(filterName, filterContent);
    expect(filters.has(filterName, filterContent)).toBe(false);
    expect(filters.length).toBe(0);
});
test("adds one filter and generates a search string", ()=>{
    const filterName = "cat";
    const filterContent = "charlie";

    filters.add(filterName, filterContent);
    const expectedSearchString = `(cat:"charlie")`;
    expect(filters.toSearchString()).toBe(expectedSearchString);
});

test("adds multiple filters and removes one", ()=>{
    const filterData = [
        {name:'car', content:'toyota'},
        {name:'truck', content:'ford'},
        {name:'van', content:'econoline'},
        {name:'truck', content:'dodge'}
    ];

    filterData.map(function(data){
        filters.add(data.name, data.content);
    });

    expect(filters.length).toBe(4);
    filters.remove('truck', 'ford');
    expect(filters.length).toBe(3);
});

test("adds multiple filters and clears/empties the collection", ()=>{
    const filterData = [
        {name:'car', content:'toyota'},
        {name:'truck', content:'ford'},
        {name:'van', content:'econoline'},
        {name:'truck', content:'dodge'}
    ];

    filterData.map(function(data){
        filters.add(data.name, data.content);
    });

    expect(filters.length).toBe(4);
    filters.clear();
    expect(filters.length).toBe(0);
});

test("adds multiple filters and generates a search string", ()=>{
    const filterData = [
        {name:'cat', content:'simba'},
        {name:'dog', content:'shadow'}
    ];

    filterData.map(function(data){
        filters.add(data.name, data.content);
    });

    expect(filters.length).toBe(2);

    const expectedSearchString = `(cat:"simba") OR (dog:"shadow")`;
    expect(filters.toSearchString()).toBe(expectedSearchString);
});

test("adds multiple *dirty* filters and generates a search string", ()=>{
    const filterData = [
        {name:'cat', content:'Tiger&#" Balm'},
        {name:'dog', content:'Shadow, $$boxer'}
    ];

    filterData.map(function(data){
        filters.add(data.name, data.content);
    });

    expect(filters.length).toBe(2);

    const expectedSearchString = `(cat:"Tiger Balm") OR (dog:"Shadow boxer")`;
    expect(filters.toSearchString()).toBe(expectedSearchString);
});
