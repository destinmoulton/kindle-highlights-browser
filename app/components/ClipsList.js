import React from "react";

import ClipRow from "./ClipRow";

import ClipSorter from "../lib/clipsorter";

import ClipsButtonBar from "./ClipsButtonBar";

export default class TitleList extends React.Component {

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
        const { clips, sortParam, activeTitle } = this.props;

        this.clipSorter.sortClips(clips, this.state.sortBy);

        const clipItems = [];
        clips.map(function(clip){
            clipItems.push(<ClipRow key={clip.date} clip={clip}/>);
        });
        return (
            <div >
                <ClipsButtonBar sortChangeHandler={this.sortChangeHandler.bind(this)} sortBy={this.state.sortBy}/>
                <h3>{activeTitle}</h3>
                {clipItems}
            </div>
        );
    }
}