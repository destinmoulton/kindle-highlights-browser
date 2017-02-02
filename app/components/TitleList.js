
import React from "react";

import TitleRow from "./TitleRow";

export default class TitleList extends React.Component {
    render(){
        const { clippings, changeSelectedTitle, activeTitle} = this.props;

        const listItems = [];
        Object.keys(clippings).map(function(clipTitle){
            listItems.push(<TitleRow key={clipTitle} 
                                     clip={clippings[clipTitle]} 
                                     changeSelectedTitle={changeSelectedTitle}
                                     activeTitle={activeTitle}/>);
        });
        return (
            <div >
                {listItems}
            </div>
        );
    }
}