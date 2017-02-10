import React from "react";

import HelpSection from "./HelpSection";

import HTMLGrabber from "../lib/htmlgrabber";

const HELP_DIR = 'help';
export default class Help extends React.Component{

    constructor(props){
        super(props);

        this.helpSections = [
            'where_is_my_clippings'
        ];
    }

    render(){
        let helpContents = [];
        this.helpSections.map(function(section){
            const html = HTMLGrabber(HELP_DIR, section);
            helpContents.push(<HelpSection key={section} htmlContent={html}/>);
        });
        return (
            <div>
                {helpContents}
            </div>            
        );
    }
}