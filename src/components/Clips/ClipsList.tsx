import * as React from "react";

import { Card } from "react-bootstrap";

import ClipRow from "./ClipRow";
import ClipSorter from "../../lib/ClipSorter";
import * as Types from "../../types";

interface Props {
    clips: Types.Clip[];
    sortBy: string;
}

class ClipsList extends React.Component<Props> {
    clipSorter: ClipSorter;
    constructor(props: Props) {
        super(props);

        this.clipSorter = new ClipSorter();
    }

    render() {
        const { clips, sortBy } = this.props;
        const { title, authorFullName } = clips[0];

        this.clipSorter.sortClips(clips, sortBy);
        const clipItems: React.ReactElement[] = [];
        clips.map(function(clip, index) {
            clipItems.push(<ClipRow key={index} clip={clip} />);
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

export default ClipsList;
