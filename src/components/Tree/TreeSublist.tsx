import * as React from "react";

import Node from "./Node";
import FiltersCollection from "../../lib/FiltersCollection";

interface Props {
    listData: string[];
    listTitle: string;
    filters: FiltersCollection;
    filterFieldName: string;
    handleChangeSelectedFilter: (e: any) => void;
    searchString: string;
}

interface State {
    isOpen: boolean;
}

class TreeSublist extends React.Component<Props, State> {
    constructor(props: Props) {
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
    handleOpenClose(e: any) {
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

        let sublist: React.ReactElement[] = [];

        listData.forEach(function(itemName) {
            const safeName = itemName.toLowerCase();

            const node = (
                <Node
                    key={itemName}
                    handleChangeSelectedFilter={handleChangeSelectedFilter}
                    filterFieldName={filterFieldName}
                    filters={filters}
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
        let sublistContent = null;
        if (isOpen) {
            iconClasses = "fa fa-minus-circle khb-treelist-icon";
            sublistContent = sublist;
        }

        return (
            <div className="khb-treelist-subtree-container">
                <div className="khb-treelist-subtree-title">
                    <i
                        className={iconClasses}
                        onClick={this.handleOpenClose.bind(this)}
                    />{" "}
                    {listTitle}
                </div>
                <ul className="khb-treelist-subtree">{sublistContent}</ul>
            </div>
        );
    }
}

export default TreeSublist;
