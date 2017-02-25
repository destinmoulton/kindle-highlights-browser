import React from "react";

import WhereClipboard from "./Help/WhereClipboard";

export default class Help extends React.Component{
    render(){
        let helpContents = [];

        return (
            <div>
                <WhereClipboard/>
            </div>            
        );
    }
}