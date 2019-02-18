import * as React from "react";
import FiltersCollection from "../../lib/FiltersCollection";

interface Props {
    itemName: string;
    handleChangeSelectedFilter: (e: any) => void;
    filterFieldName: string;
    filters: FiltersCollection;
}

function Node(props: Props) {
    const {
        itemName,
        handleChangeSelectedFilter,
        filterFieldName,
        filters
    } = props;

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

Node.propTypes = {};

export default Node;
