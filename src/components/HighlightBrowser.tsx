import React from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import TreeList from "./Tree/TreeList";
import ClipsContainer from "./Clips/ClipsContainer";
import EmptyClipList from "./Clips/EmptyClipList";
import Row from "react-bootstrap/Row";

import FiltersCollection from "../lib/FiltersCollection";

class HighlightBrowser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: new FiltersCollection()
        };
    }

    /**
     * Fire when the user clicks on a Title or Author
     * in the TreeSublist component.
     *
     * @param event e
     */
    handleChangeSelectedFilter(e) {
        document.getElementById("khb-clips-container").scrollTop = 0;

        let newFilterField = e.target.getAttribute("data-filter-field");
        let newFilterContent = e.target.getAttribute("data-filter-content");

        if (e.ctrlKey) {
            if (this.state.filters.has(newFilterField, newFilterContent)) {
                this.setState({
                    filters: this.state.filters.remove(
                        newFilterField,
                        newFilterContent
                    )
                });
            } else {
                this.setState({
                    filters: this.state.filters.add(
                        newFilterField,
                        newFilterContent
                    )
                });
            }
        } else {
            if (this.state.filters.has(newFilterField, newFilterContent)) {
                this.setState({
                    filters: this.state.filters.clear()
                });
            } else {
                this.setState({
                    filters: this.state.filters
                        .clear()
                        .add(newFilterField, newFilterContent)
                });
            }
        }
    }

    filterClips() {
        let clips = {};
        const { clippings } = this.props;
        const { filters } = this.state;

        const clipKeys = Object.keys(clippings);
        clipKeys.map(key => {
            filters.each((filterField, filterContent) => {
                if (clippings[key].hasOwnProperty(filterField)) {
                    if (clippings[key][filterField] === filterContent) {
                        if (!clips.hasOwnProperty(clippings[key]["title"])) {
                            // Group the clips by title
                            clips[clippings[key]["title"]] = [];
                        }
                        clips[clippings[key]["title"]].push(clippings[key]);
                    }
                }
            });
        });

        return clips;
    }

    render() {
        const { clippings, authors, titles } = this.props;
        const { filters } = this.state;

        const clips = this.filterClips();

        let clipsContents = <EmptyClipList />;
        if (Object.keys(clips).length > 0) {
            clipsContents = <ClipsContainer clips={clips} filters={filters} />;
        }

        return (
            <Row>
                <Col xs={4} id="khb-treelist-container">
                    <TreeList
                        authors={authors}
                        titles={titles}
                        handleChangeSelectedFilter={this.handleChangeSelectedFilter.bind(
                            this
                        )}
                        filters={filters}
                    />
                </Col>

                <Col xs={8} id="khb-clips-container">
                    {clipsContents}
                </Col>
            </Row>
        );
    }
}

HighlightBrowser.propTypes = {
    clippings: PropTypes.object,
    authors: PropTypes.array,
    titles: PropTypes.array
};

export default HighlightBrowser;