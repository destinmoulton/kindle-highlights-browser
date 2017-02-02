import React from "react";

import ClipRow from "./ClipRow";

export default class TitleList extends React.Component {
    render(){
        const { clips } = this.props;

        const clipItems = [];
        clips.map(function(clip){
            clipItems.push(<ClipRow key={clip.date} clip={clip}/>);
        });
        return (
            <div >
                {clipItems}
            </div>
        );
    }
}