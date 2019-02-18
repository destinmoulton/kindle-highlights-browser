import * as React from "react";

import Col from "react-bootstrap/Col";
import TreeList from "./Tree/TreeList";
import ClipsContainer from "./Clips/ClipsContainer";
import EmptyClipList from "./Clips/EmptyClipList";
import Row from "react-bootstrap/Row";

import FiltersCollection from "../lib/FiltersCollection";
import * as Types from "../types";

interface Props {
    clippingsMap: Types.ClippingsMap;
    authors: Types.Authors;
    titles: Types.Titles;
}

interface State {
    filters: FiltersCollection;
}
class HighlightBrowser extends React.Component<Props, State> {
    constructor(props: Props) {
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
    handleChangeSelectedFilter(e: any) {
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
        let filteredClips: Types.FilteredClips = {};
        const { clippingsMap } = this.props;
        const { filters } = this.state;

        const clipKeys = Object.keys(clippingsMap);
        clippingsMap.forEach((clip: Types.Clip, key: Types.ClipKey) => {
            filters.each((filterField: string, filterContent: string) => {
                if (clip.hasOwnProperty(filterField)) {
                    if (clip[filterField] === filterContent) {
                        if (!filteredClips.hasOwnProperty(clip["title"])) {
                            // Group the clips by title
                            filteredClips[clip["title"]] = [];
                        }
                        filteredClips[clip["title"]].push(clip);
                    }
                }
            });
        });

        return filteredClips;
    }

    render() {
        const { authors, titles } = this.props;
        const { filters } = this.state;

        const filteredClips = this.filterClips();

        let clipsContents = <EmptyClipList />;
        if (Object.keys(filteredClips).length > 0) {
            clipsContents = (
                <ClipsContainer
                    filteredClips={filteredClips}
                    filters={filters}
                />
            );
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

export default HighlightBrowser;
