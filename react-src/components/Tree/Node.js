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
                    className={className}
                    onClick={handleChangeSelectedFilter}
                    data-filter-field={filterFieldName}
                    data-filter-content={itemName}>{itemName}</li>);
    }
}

export default Node;