import * as React from "react";

import SearchBox from "./SearchBox";
import TreeSublist from "./TreeSublist";
import FiltersCollection from "../../lib/FiltersCollection";
import * as Types from "../../types";

interface Props {
    authors: Types.Authors;
    titles: Types.Titles;
    handleChangeSelectedFilter: (e: any) => void;
    filters: FiltersCollection;
}

interface State {
    searchString: string;
    originalSearchString: string;
}

class TreeList extends React.Component<Props, State> {
    constructor(props: Props) {
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
    handleSearchChange(e: any) {
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
    handleClearSearch(e: any) {
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

export default TreeList;
