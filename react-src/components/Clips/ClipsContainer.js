import React, { Component } from "react";
import PropTypes from "prop-types";

import ClipsList from "./ClipsList";
import ClipsButtonBar from "./ClipsButtonBar";

class ClipsContainer extends Component {
    static propTypes = {
        clips: PropTypes.object,
        filters: PropTypes.object
    };

    constructor(props) {
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
    sortChangeHandler(e) {
        this.setState({
            sortBy: e.target.value
        });
    }

    render() {
        const { clips, filters } = this.props;
        const { sortBy } = this.state;
        const clipsLists = [];
        const clipKeys = Object.keys(clips);
        clipKeys.map(function(sectionTitle) {
            clipsLists.push(
                <ClipsList
                    key={sectionTitle}
                    sortBy={sortBy}
                    clips={clips[sectionTitle]}
                />
            );
        });
        return (
            <div>
                <ClipsButtonBar
                    sortChangeHandler={this.sortChangeHandler.bind(this)}
                    sortBy={this.state.sortBy}
                    clips={clips}
                    filters={filters}
                />
                {clipsLists}
            </div>
        );
    }
}

export default ClipsContainer;
