import _ from 'lodash';

export default class FiltersCollection {

    constructor (){
        this.filters = [];
    }

    _cleanFilterContent(dirtyContent){
        return dirtyContent.replace(/\W/g, '');
    }

    add(filterField, filterContent){
        if(!this.has(filterField, filterContent)){
            const cleanContent = this._cleanFilterContent(filterContent);
            this.filters.push({
               filterField, 
               filterContent:cleanContent
            });
        }
    }

    remove(filterField, filterContent){
        const cleanContent = this._cleanFilterContent(filterContent);
        if(this.has(filterField, cleanContent)){
            this.filters = _.filter(this.filters, (o)=>{
                return o.filterField !== filterField && o.filterContent !== cleanContent;
            });
        }
    }

    has(filterField, filterContent){
        const cleanContent = this._cleanFilterContent(filterContent);
        const test = _.find(this.filters, (o)=>{
            return o.filterField === filterField && o.filterContent === cleanContent;
        });

        return (test !== undefined);
    }

    get length(){
        return this.filters.length;
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
            searchString += `(${filterObj.filterField}:${filterObj.filterContent})`;
        });
        return searchString;
    }
}