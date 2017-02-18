import React from "react";

import { Well } from "react-bootstrap";

import ClipRow from "./ClipRow";
import ClipSorter from "../../lib/clipsorter";
import ClipsButtonBar from "./ClipsButtonBar";

export default class ClipsList extends React.Component {

    constructor(props){
        super(props);

        this.clipSorter = new ClipSorter();
        this.state = {
            sortBy:'location_start|asc'
        }
    }

    sortChangeHandler(e){
        this.setState({
            sortBy: e.target.value
        });
    }

    render(){
        const { clips, sortParam, filterField, filterContent } = this.props;
        const { title, authorFullName } = clips[0];
        this.clipSorter.sortClips(clips, this.state.sortBy);
        const clipItems = [];
        clips.map(function(clip){
            clipItems.push(<ClipRow key={clip.date} clip={clip}/>);
        });
        return (
            <div >
                <ClipsButtonBar sortChangeHandler={this.sortChangeHandler.bind(this)} 
                                sortBy={this.state.sortBy}
                                clips={clips}
                                activeTitle={title}/>                                    
                <Well>
                <h3>{title}</h3>
                <h4>{authorFullName}</h4>
                </Well>
                {clipItems}
            </div>
        );
    }
}