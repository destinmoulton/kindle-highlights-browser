import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

import ClipRow from "./ClipRow";
import ClipSorter from "../../lib/ClipSorter";

class ClipsList extends Component {
    constructor(props) {
        super(props);

        this.clipSorter = new ClipSorter();
    }

    render() {
        const { clips, sortBy } = this.props;
        const { title, authorFullName } = clips[0];

        this.clipSorter.sortClips(clips, sortBy);
        const clipItems = [];
        clips.map(function(clip) {
            clipItems.push(<ClipRow key={clip.date} clip={clip} />);
        });

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>{authorFullName}</Card.Subtitle>
                    </Card.Body>
                </Card>
                {clipItems}
            </div>
        );
    }
}
ClipsList.propTypes = {
    clips: PropTypes.array,
    sortBy: PropTypes.string
};

export default ClipsList;
