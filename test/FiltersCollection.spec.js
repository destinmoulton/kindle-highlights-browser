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
        const expectedSearchString = `(cat:"charlie")`;
        expect(filters.toSearchString()).to.equal(expectedSearchString);
    });

    it("adds multiple filters and removes one", function(){
        const filterData = [
            {name:'car', content:'toyota'},
            {name:'truck', content:'ford'},
            {name:'van', content:'econoline'},
            {name:'truck', content:'dodge'}
        ];

        filterData.map(function(data){
            filters.add(data.name, data.content);
        });

        expect(filters.length).to.equal(4);
        filters.remove('truck', 'ford');
        expect(filters.length).to.equal(3);
    });

    it("adds multiple filters and clears/empties the collection", function(){
        const filterData = [
            {name:'car', content:'toyota'},
            {name:'truck', content:'ford'},
            {name:'van', content:'econoline'},
            {name:'truck', content:'dodge'}
        ];

        filterData.map(function(data){
            filters.add(data.name, data.content);
        });

        expect(filters.length).to.equal(4);
        filters.clear();
        expect(filters.length).to.equal(0);
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

        const expectedSearchString = `(cat:"simba") OR (dog:"shadow")`;
        expect(filters.toSearchString()).to.equal(expectedSearchString);
    });

    it("adds multiple *dirty* filters and generates a search string", function(){
        const filterData = [
            {name:'cat', content:'Tiger&#" Balm'},
            {name:'dog', content:'Shadow, $$boxer'}
        ];

        filterData.map(function(data){
            filters.add(data.name, data.content);
        });

        expect(filters.length).to.equal(2);

        const expectedSearchString = `(cat:"Tiger Balm") OR (dog:"Shadow boxer")`;
        expect(filters.toSearchString()).to.equal(expectedSearchString);
    });
});