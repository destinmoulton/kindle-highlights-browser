import React from "react";

class ClipRow extends React.Component {
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
                <div>{icon}  {loc} -- {clip.date.format("MMMM DD, YYYY h:mm:ss a")}</div>
                <div>{quote}{clip.text}{quote}</div>
                <hr/>
            </div>
        );
    }
}

ClipRow.propTypes = {
    clip:React.PropTypes.object
};

export default ClipRow;