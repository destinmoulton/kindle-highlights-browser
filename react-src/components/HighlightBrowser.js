import React from "react";

import { Col } from "react-bootstrap";

import TreeList from "./Tree/TreeList";
import ClipsContainer from "./Clips/ClipsContainer";
import EmptyClipList from "./Clips/EmptyClipList";

export default class HighlightBrowser extends React.Component{
    constructor(props){
        super(props);

        this.state={
            filterField:"",
            filterContent:""
        }
    }

    handleChangeSelectedFilter(e){
        document.getElementById('khb-clips-container').scrollTop = 0;
        
        this.setState({
            filterField:e.target.getAttribute('data-filter-field'),
            filterContent:e.target.getAttribute('data-filter-content')
        });
    }

    filterClips(){
        let clips = {};
        const { clippings } = this.props;
        const { filterField, filterContent } = this.state;

        const clipKeys = Object.keys(clippings);
        clipKeys.map(function(key){
            if(clippings[key].hasOwnProperty(filterField)){
                if(clippings[key][filterField]===filterContent){
                    if(!clips.hasOwnProperty(clippings[key]['title'])){
                        // Group the clips by title
                        clips[clippings[key]['title']] = [];
                    }
                    clips[clippings[key]['title']].push(clippings[key]);
                }
            }
        });

        return clips;
    }

    render(){
        const { clippings, authors, titles } = this.props;
        const { filterField, filterContent } = this.state;
        
        const clips = this.filterClips();
        
        let clipsContents = <EmptyClipList/>;
        if(Object.keys(clips).length > 0){
            clipsContents = <ClipsContainer clips={clips} 
                                            filterField={filterField} 
                                            filterContent={filterContent}/>;
        }
        
        return (
            <div>
                <Col xs={4} id="khb-treelist-container">
                    <TreeList authors={authors}
                              titles={titles}
                              handleChangeSelectedFilter={this.handleChangeSelectedFilter.bind(this)}
                              filterField={filterField} 
                              filterContent={filterContent}/>
                </Col>
                <Col xs={8} id="khb-clips-container">
                    {clipsContents}
                </Col>
            </div>
        );

    }
}