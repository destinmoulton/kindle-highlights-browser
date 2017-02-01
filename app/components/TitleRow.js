
import React from "react";

export default class TitleRow extends React.Component {
    render(){
        const {clip, changeSelectedTitle, activeTitle} = this.props;
        let classes = "khb-titlelist-titlerow";
        if(activeTitle === clip.title){
            classes += " khb-titlelist-titlerow-active";
        }
        return (
            <div onClick={changeSelectedTitle} 
                 className={classes}
                 data-title={clip.title}>
                {clip.title}
            </div>
        );
    }
}