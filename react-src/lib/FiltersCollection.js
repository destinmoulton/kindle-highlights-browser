import _ from 'lodash';

export default class FiltersCollection {

    constructor (){
        this.filters = [];
    }

    /**
     * Clean up the string. Remove all non alphanumeric. Leaves spaces.
     * 
     * @param String dirtyContent
     * @return String
     */
    _cleanFilterContent(dirtyContent){
        return dirtyContent.trim().replace(/[^\w\s]/gi, '');
    }

    /**
     * Add a filter.
     * 
     * @param String fieldName
     * @param String filterContent
     * @return Object (Need to maintain state!)
     */
    add(fieldName, filterContent){
        if(!this.has(fieldName, filterContent)){
            const cleanContent = this._cleanFilterContent(filterContent);
            this.filters.push({
               fieldName, 
               cleanContent:cleanContent,
               dirtyContent:filterContent
            });
        }
        return this;
    }

    /**
     * Remove a filter.
     * 
     * @param String fieldName
     * @param String filterContent
     * @return Object this (Need to maintain state!)
     */
    remove(fieldName, filterContent){
        const cleanContent = this._cleanFilterContent(filterContent);
        if(this.has(fieldName, cleanContent)){
            _.remove(this.filters, (o)=>{
                return o.fieldName === fieldName && o.cleanContent === cleanContent;
            });
        }
        return this;
    }

    /**
     * Check if a filter exists
     * 
     * @param String fieldName
     * @param String filterContent
     * @return Bool
     */
    has(fieldName, filterContent){
        const cleanContent = this._cleanFilterContent(filterContent);
        const test = _.find(this.filters, (o)=>{
            return o.fieldName === fieldName && o.cleanContent === cleanContent;
        });

        return (test !== undefined);
    }

    /**
     * Loop over the filters, running a callback.
     */
    each(callback){
        this.filters.map(function(filter){
            callback(filter.fieldName, filter.dirtyContent, filter.cleanContent);
        });
    }

    /**
     * Convert the array to an OR delimited searsh string.
     */
    toSearchString(){
        let searchString = "";
        this.filters.map(function(filterObj){
            if(searchString !== ""){
                searchString += " OR ";
            }
            searchString += `(${filterObj.fieldName}:"${filterObj.cleanContent}")`;
        });
        return searchString;
    }

    /**
     * Clear the filters.
     * @return Object this (Need to maintain state!)
     */
    clear(){
        this.filters = [];
        return this;
    }

    /**
     * Getter to acquire the number of filters.
     * 
     * @return Number
     */
    get length(){
        return this.filters.length;
    }
}