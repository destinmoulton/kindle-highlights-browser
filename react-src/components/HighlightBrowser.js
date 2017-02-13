import React from "react";

import { Col } from "react-bootstrap";

import TitleList from "./TitleList";
import ClipsList from "./Clips/ClipsList";
import EmptyClipList from "./Clips/EmptyClipList";

export default class HighlightBrowser extends React.Component{
    constructor(props){
        super(props);

        this.state={
            activeTitle:""
        }
    }

    changeSelectedTitle(e){
        document.getElementById('khb-clipscontainer').scrollTop = 0;
        this.setState({
            activeTitle:e.target.getAttribute('data-title')
        });
    }

    render(){
        const { clippings } = this.props;
        const { activeTitle } = this.state;
        let clips = [];
        if(clippings[activeTitle]!==undefined){
            clips = clippings[activeTitle]['clips'];
        }

        let clipsContents = <EmptyClipList/>;
        if(clips.length > 0){
            clipsContents = <ClipsList clips={clips} activeTitle={activeTitle}/>;
        }
        
        return (
            <div>
                <Col xs={4} id="khb-titlelist-container">
                    <TitleList clippings={clippings} 
                            changeSelectedTitle={this.changeSelectedTitle.bind(this)}
                            activeTitle={activeTitle}/>
                </Col>
                <Col xs={8} id="khb-clipscontainer">
                    {clipsContents}
                </Col>
            </div>
        );

    }
}