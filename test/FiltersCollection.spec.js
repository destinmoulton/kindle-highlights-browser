/**
 * Test the lib/Filters.js file.
 */

import { expect } from "chai";

import FiltersCollection from '../react-src/lib/FiltersCollection'

describe("Filters Collection", function(){
    let filters = {};
    beforeEach(function(){
        filters = new FiltersCollection();
    });
    it("adds a basic filter", function(){
        const filterName = "cat";
        const filterContent = "tiger";

        filters.add(filterName, filterContent);

        expect(filters.has(filterName, filterContent)).to.equal(true);
        expect(filters.length).to.equal(1);
    });
    it("removes a basic filter", function(){
        const filterName = "cat";
        const filterContent = "bella";

        filters.add(filterName, filterContent);

        expect(filters.has(filterName, filterContent)).to.equal(true);
        expect(filters.length).to.equal(1);
        filters.remove(filterName, filterContent);
        expect(filters.has(filterName, filterContent)).to.equal(false);
        expect(filters.length).to.equal(0);
    });
    it("adds and removes a filter with random *dirty* characters", function(){
        const filterName = "cat";
        const filterContent = `'$%@!*()[oreo]`;

        filters.add(filterName, filterContent);

        expect(filters.has(filterName, filterContent)).to.equal(true);
        expect(filters.length).to.equal(1);
        filters.remove(filterName, filterContent);
        expect(filters.has(filterName, filterContent)).to.equal(false);
        expect(filters.length).to.equal(0);
    });
    it("adds one filter and generates a search string", function(){
        const filterName = "cat";
        const filterContent = "charlie";

        filters.add(filterName, filterContent);
        const expectedSearchString = "(cat:charlie)";
        expect(filters.toSearchString()).to.equal(expectedSearchString);
    });

    it("adds multiple filters and generates a search string", function(){
        const filterData = [
            {name:'cat', content:'simba'},
            {name:'dog', content:'shadow'}
        ];

        filterData.map(function(data){
            filters.add(data.name, data.content);
        });

        expect(filters.length).to.equal(2);

        const expectedSearchString = "(cat:simba) OR (dog:shadow)";
        expect(filters.toSearchString()).to.equal(expectedSearchString);
    });
});