import React from "react";

import {ButtonToolbar,Button} from "react-bootstrap";

export default class ClipsButtonBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ButtonToolbar>
                <Button>Save Highlights</Button>
                <Button>Copy Highlights</Button>
            </ButtonToolbar>
        );
    }
}