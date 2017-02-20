import React, { Component } from 'react';

class Node extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const { itemName, handleChangeSelectedFilter, filterFieldName, filterContent} = this.props;

        let className = "";
        if(filterContent === itemName){
            className = "khb-treelist-activenode";
        }
        return (<li key={itemName}
                    
                    onClick={handleChangeSelectedFilter}
                    data-filter-field={filterFieldName}
                    data-filter-content={itemName}>
                    <div className={className}>{itemName}</div>
                </li>);
    }
}

export default Node;