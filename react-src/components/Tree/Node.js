import React, { Component } from 'react';

class Node extends Component {
    render() {
        const { itemName, handleChangeSelectedFilter, filterFieldName} = this.props;

        return (<li key={itemName}
                onClick={handleChangeSelectedFilter}
                data-filter-field={filterFieldName}
                data-filter-content={itemName}>{itemName}</li>);
    }
}

export default Node;