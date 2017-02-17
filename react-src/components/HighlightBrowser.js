import React from "react";

import { Col } from "react-bootstrap";

import TreeList from "./TreeList";
import ClipsList from "./Clips/ClipsList";
import EmptyClipList from "./Clips/EmptyClipList";

export default class HighlightBrowser extends React.Component{
    constructor(props){
        super(props);

        this.state={
            filterField:"",
            filterContent:""
        }
    }

    changeSelectedFilter(e){
        document.getElementById('khb-clipscontainer').scrollTop = 0;
        
        this.setState({
            filterField:e.target.getAttribute('data-filter-field'),
            filterContent:e.target.getAttribute('data-filter-content')
        });
    }

    render(){
        const { clippings, authors, titles } = this.props;
        const { filterField, filterContent } = this.state;
        console.log(filterField, filterContent);
        let clips = [];

        const clipKeys = Object.keys(clippings);
        clipKeys.map(function(key){
            if(clippings[key].hasOwnProperty(filterField)){
                if(clippings[key][filterField]===filterContent){
                    clips.push(clippings[key]);
                }
            }
        });

        let clipsContents = <EmptyClipList/>;
        if(clips.length > 0){
            clipsContents = <ClipsList clips={clips} filterField={filterField} filterContent={filterContent}/>;
        }
        
        return (
            <div>
                <Col xs={4} id="khb-titlelist-container">
                    <TreeList clippings={clippings}
                              authors={authors}
                              titles={titles}
                              changeSelectedFilter={this.changeSelectedFilter.bind(this)}
                              filterField={filterField} 
                              filterContent={filterContent}/>
                </Col>
                <Col xs={8} id="khb-clipscontainer">
                    {clipsContents}
                </Col>
            </div>
        );

    }
}