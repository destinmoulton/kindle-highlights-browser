import React, { Component } from "react";
import PropTypes from "prop-types";

import SearchBox from "./SearchBox";
import TreeSublist from "./TreeSublist";

class TreeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            originalSearchString: ""
        };
    }

    /**
     * Handle the event when the user types
     * in the SearchBox component
     *
     * @param event e
     */
    handleSearchChange(e) {
        let originalSearchString = e.target.value;
        this.setState({
            searchString: originalSearchString.toLowerCase().trim(),
            originalSearchString
        });
    }

    /**
     * Clear the search string, fired by the
     * X in the SearchBox component
     *
     * @param event e
     */
    handleClearSearch(e) {
        this.setState({
            searchString: "",
            originalSearchString: ""
        });
    }

    render() {
        const {
            authors,
            titles,
            handleChangeSelectedFilter,
            filters
        } = this.props;
        const { searchString, originalSearchString } = this.state;
        return (
            <div>
                <SearchBox
                    handleSearchChange={this.handleSearchChange.bind(this)}
                    handleClearSearch={this.handleClearSearch.bind(this)}
                    originalSearchString={originalSearchString}
                />
                <TreeSublist
                    key="authors"
                    listData={authors}
                    listTitle="Authors"
                    filterFieldName="authorFullName"
                    filters={filters}
                    searchString={searchString}
                    handleChangeSelectedFilter={handleChangeSelectedFilter}
                />
                <TreeSublist
                    key="titles"
                    listData={titles}
                    listTitle="Titles"
                    filterFieldName="title"
                    filters={filters}
                    searchString={searchString}
                    handleChangeSelectedFilter={handleChangeSelectedFilter}
                />
            </div>
        );
    }
}

TreeList.propTypes = {
    authors: PropTypes.array,
    titles: PropTypes.array,
    handleChangeSelectedFilter: PropTypes.func,
    filters: PropTypes.object
};

export default TreeList;
