import React, { Component } from 'react';

import Filter from './Filter';
import TreeSublist from './TreeSublist';

class TreeList extends Component {
    render() {
        const { authors, titles, handleChangeSelectedFilter, filterField, filterContent} = this.props;

        return (
            <div>
                <Filter/>
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

            </div>
        );
    }
}

export default TreeList;