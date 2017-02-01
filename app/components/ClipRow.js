import React from "react";

export default class ClipRow extends React.Component {
    render(){
        const {clip} = this.props;
        return (
            <div>
                <div>{clip.date.format("MMMM DD, YYYY h:mm:ss a")}</div>
                <div>{clip.text}</div>
                <hr/>
            </div>
        );
    }
}