import React from "react";

import WhereClipboard from "./Help/WhereClipboard";

export default class Help extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        let helpContents = [];

        return (
            <div>
                <WhereClipboard/>
            </div>            
        );
    }
}