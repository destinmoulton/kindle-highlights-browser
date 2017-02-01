import React from "react";

import { Col } from "react-bootstrap";


import TitleList from "./TitleList";
import ClipsList from "./ClipsList";
import ClipsButtonBar from "./ClipsButtonBar";

export default class HighlightBrowser extends React.Component{
    constructor(props){
        super(props);

        this.state={
            activeTitle:""
        }
    }

    changeSelectedTitle(e){
        this.setState({
            activeTitle:e.target.getAttribute('data-title')
        });
    }

    render(){
        const { clippings } = this.props;
        let clips = [];
        if(clippings[this.state.activeTitle]!==undefined){
            clips = clippings[this.state.activeTitle]['clips'];
        }

        let clipsContents = "";
        if(clips.length > 0){
            clipsContents = <div><ClipsButtonBar /><ClipsList clips={clips}/></div>;
        }
        
        return (
            <div>
                <Col xs={6} md={4}>
                    <TitleList clippings={clippings} 
                            changeSelectedTitle={this.changeSelectedTitle.bind(this)}
                            activeTitle={this.state.activeTitle}/>
                </Col>
                <Col xs={12} md={8} className="khb-clipscontainer">
                    {clipsContents}
                </Col>
            </div>
        );

    }
}

