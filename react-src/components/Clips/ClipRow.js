import React, { Component } from "react";
import PropTypes from "prop-types";

class ClipRow extends Component {
    static propTypes = {
        clip: PropTypes.object
    };

    render(){
        const {clip} = this.props;
        let loc = "";
        let icon = "";
        let quote = "";

        if(clip.location.type === 'highlight') {
            loc = "Highlight at ";
            icon = <i className='fa fa-quote-left khb-clipslist-icon' aria-hidden='true'></i>;
            quote=`"`;
        } else if(clip.location.type === 'note'){
            loc = "Note at ";
            icon = <i className='fa fa-sticky-note-o khb-clipslist-icon' aria-hidden='true'></i>;
        }

        loc += `Location: ${clip.location.value}`;

        return (
            <div>
                <div>{icon}&nbsp;<span className='khb-clipslist-cliploc'>{loc}</span> -- <span className='khb-clipslist-clipdate'>{clip.date.format("MMMM DD, YYYY h:mm:ss a")}</span></div>
                <div>{quote}{clip.text}{quote}</div>
                <hr/>
            </div>
        );
    }
}

export default ClipRow;