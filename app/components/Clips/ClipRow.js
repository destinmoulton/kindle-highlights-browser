import React from "react";

export default class ClipRow extends React.Component {
    render(){
        const {clip} = this.props;
        let loc = "";

        if(clip.location.type==='location') {
            loc = `Location: ${clip.location.value}`;
        }

        let icon = <i className='fa fa-quote-right' aria-hidden='true'></i>;

        if(clip.location.type==='note'){
            icon = <i className='fa fa-sticky-note-o' aria-hidden='true'></i>;
        }

        return (
            <div>
                <div>{icon}  {loc} -- {clip.date.format("MMMM DD, YYYY h:mm:ss a")}</div>
                <div>{clip.text}</div>
                <hr/>
            </div>
        );
    }
}