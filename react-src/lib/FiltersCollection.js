import _ from 'lodash';

class Filters {

    constructor (){
        this.filters = [];
    }

    _cleanFilterContent(dirtyContent){
        return title.replace(/\W/g, '');
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
        if(this.has(filterField, filterContent)){
            _.filter(this.filters, (o)=>{
                return o.filterField !== filterField && o.filterContent !== filterContent;
            });
        }
    }

    has(filterField, filterContent){
        return _.find(this.filters, (o)=>{
            return o.filterField === filterField && o.filterContent === filterContent;
        });
    }

    /**
     * Convert the array to an OR delimited searsh string.
     */
    toSearchString(){
        let searchString = "";
        this.filters.map(function(filterObj){
            if(searchString !== ""){
                searchString
            }
            searchString += `${filterObj.filterField}:"${filterObj.filterContent}"`;
        });
        return searchString;
    }
}