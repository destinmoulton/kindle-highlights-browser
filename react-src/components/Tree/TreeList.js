import React, { Component } from 'react';

import SearchBox from './SearchBox';
import TreeSublist from './TreeSublist';

class TreeList extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchString:""
        };
    }

    handleSearchChange(e){
        this.setState({
            searchString:e.target.value.toLowerCase().trim()
        });
    }
    render() {
        const { authors, titles, handleChangeSelectedFilter, filters} = this.props;
        const { searchString } = this.state;
        return (
            <div>
                <SearchBox handleSearchChange={this.handleSearchChange.bind(this)}/>
                <TreeSublist key="authors"
                             listData={authors} 
                             listTitle="Authors"
                             filterFieldName="authorFullName"
                             filters={filters}
                             searchString={searchString}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />
                <TreeSublist key="titles"
                             listData={titles} 
                             listTitle="Titles"
                             filterFieldName="title"
                             filters={filters}
                             searchString={searchString}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />

            </div>
        );
    }
}

export default TreeList;