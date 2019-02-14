import React, { Component } from "react";
import PropTypes from "prop-types";

import Node from "./Node";

class TreeSublist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    /**
     * Fire when the user presses the +/- icons.
     *
     * @param event e
     */
    handleOpenClose(e) {
        let isOpen = true;
        if (this.state.isOpen) {
            isOpen = false;
        }
        this.setState({ isOpen });
    }

    render() {
        const {
            listData,
            listTitle,
            filters,
            filterFieldName,
            handleChangeSelectedFilter,
            searchString
        } = this.props;
        const { isOpen } = this.state;

        let sublist = [];

        listData.forEach(function(itemName) {
            const safeName = itemName.toLowerCase();

            const node = (
                <Node
                    key={itemName}
                    handleChangeSelectedFilter={handleChangeSelectedFilter}
                    filterFieldName={filterFieldName}
                    filters={filters}
                    searchString={searchString}
                    itemName={itemName}
                />
            );

            if (searchString !== "" && safeName.includes(searchString)) {
                sublist.push(node);
            } else if (searchString === "") {
                sublist.push(node);
            }
        });

        let iconClasses = "fa fa-plus-circle khb-treelist-icon";
        let sublistContent = "";
        if (isOpen) {
            iconClasses = "fa fa-minus-circle khb-treelist-icon";
            sublistContent = sublist;
        }

        return (
            <div className="khb-treelist-subtree-container">
                <h4>
                    <i
                        className={iconClasses}
                        onClick={this.handleOpenClose.bind(this)}
                    />{" "}
                    {listTitle}
                </h4>
                <ul className="khb-treelist-subtree">{sublistContent}</ul>
            </div>
        );
    }
}

TreeSublist.propTypes = {
    listData: PropTypes.array,
    listTitle: PropTypes.string,
    filters: PropTypes.object,
    filterFieldName: PropTypes.string,
    handleChangeSelectedFilter: PropTypes.func,
    searchString: PropTypes.string
};

export default TreeSublist;
