import React, { Component } from "react";
import PropTypes from "prop-types";

class Node extends Component {
    static propTypes = {
        itemName: PropTypes.string,
        handleChangeSelectedFilter: PropTypes.func,
        filterFieldName: PropTypes.string,
        filters: PropTypes.object
    };

    render() {
        const {
            itemName,
            handleChangeSelectedFilter,
            filterFieldName,
            filters
        } = this.props;

        let className = "khb-treelist-node";
        if (filters.has(filterFieldName, itemName)) {
            className += " khb-treelist-activenode";
        }
        return (
            <li key={itemName}>
                <div
                    data-filter-field={filterFieldName}
                    data-filter-content={itemName}
                    className={className}
                    onClick={handleChangeSelectedFilter}
                >
                    {itemName}
                </div>
            </li>
        );
    }
}

export default Node;
