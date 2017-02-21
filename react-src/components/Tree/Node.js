import React, { Component } from 'react';

class Node extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const { itemName, handleChangeSelectedFilter, filterFieldName, filters} = this.props;

        let className = "khb-treelist-node";
        if(filters.has(filterFieldName, itemName)){
            className += " khb-treelist-activenode";
        }
        return (<li key={itemName}>
                    <div data-filter-field={filterFieldName}
                         data-filter-content={itemName}
                         className={className} 
                         onClick={handleChangeSelectedFilter}>{itemName}</div>
                </li>);
    }
}

export default Node;