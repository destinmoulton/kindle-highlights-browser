import React, { Component } from 'react';

import Filter from './Filter';
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
        const { authors, titles, handleChangeSelectedFilter, filterField, filterContent} = this.props;
        const { searchString } = this.state;
        return (
            <div>
                <Filter handleSearchChange={this.handleSearchChange.bind(this)}/>
                <TreeSublist key="authors"
                             listData={authors} 
                             listTitle="Authors"
                             filterFieldName="authorFullName"
                             filterContent={filterContent}
                             currentFilterContent={filterContent}
                             searchString={searchString}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />
                <TreeSublist key="titles"
                             listData={titles} 
                             listTitle="Titles"
                             filterFieldName="title"
                             filterContent={filterContent}
                             currentFilterContent={filterContent}
                             searchString={searchString}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />

            </div>
        );
    }
}

export default TreeList;