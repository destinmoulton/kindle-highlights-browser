import * as React from "react";

import ClipsList from "./ClipsList";
import ClipsButtonBar from "./ClipsButtonBar";
import FiltersCollection from "../../lib/FiltersCollection";

import * as Types from "../../types";

interface Props {
    filteredClips: Types.FilteredClips;
    filters: FiltersCollection;
}

interface State {
    sortBy: string;
}

class ClipsContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            sortBy: "location_start|asc"
        };
    }

    /**
     * Handle the sort handler dropdown change.
     *
     * @param Event e
     */
    sortChangeHandler(e: any) {
        this.setState({
            sortBy: e.target.value
        });
    }

    render() {
        const { filteredClips, filters } = this.props;
        const { sortBy } = this.state;
        const clipSections: React.ReactElement[] = [];
        const clipKeys = Object.keys(filteredClips);
        clipKeys.map(function(sectionTitle) {
            clipSections.push(
                <ClipsList
                    key={sectionTitle}
                    sortBy={sortBy}
                    clips={filteredClips[sectionTitle]}
                />
            );
        });
        return (
            <div>
                <ClipsButtonBar
                    sortChangeHandler={this.sortChangeHandler.bind(this)}
                    filteredClips={filteredClips}
                />
                <div className="khb-clipslist-container">{clipSections}</div>
            </div>
        );
    }
}

export default ClipsContainer;
