import React, { Component } from 'react';

import { Well } from "react-bootstrap";

import ClipRow from "./ClipRow";
import ClipSorter from "../../lib/clipsorter";

class ClipsList extends Component {
    constructor(props){
        super(props);

        this.clipSorter = new ClipSorter();
    }

    render() {
        const { clips, sortBy } = this.props;
        const { title, authorFullName } = clips[0];
        
        this.clipSorter.sortClips(clips, sortBy);
        const clipItems = [];
        clips.map(function(clip){
            clipItems.push(<ClipRow key={clip.date} clip={clip}/>);
        });

        return (
            <div>
                <Well>
                    <h3>{title}</h3>
                    <h4>{authorFullName}</h4>
                </Well>
                {clipItems}
            </div>
        );
    }
}

ClipsList.propTypes = { 
    clips:React.PropTypes.array, 
    sortBy:React.PropTypes.string
};

export default ClipsList;