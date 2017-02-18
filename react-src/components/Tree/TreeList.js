import React, { Component } from 'react';


import TreeSublist from './TreeSublist';

class TreeList extends Component {
    render() {
        const { authors, titles, handleChangeSelectedFilter, filterField, filterContent} = this.props;

        return (
            <span>
                <TreeSublist key="authors"
                             listData={authors} 
                             listTitle="Authors"
                             filterFieldName="authorFullName"
                             currentFilterContent={filterContent}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />
                <TreeSublist key="titles"
                             listData={titles} 
                             listTitle="Titles"
                             filterFieldName="title"
                             currentFilterContent={filterContent}
                             handleChangeSelectedFilter={handleChangeSelectedFilter} />

            </span>
        );
    }
}

export default TreeList;