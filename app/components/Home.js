import React from "react";

import {Button, Panel} from "react-bootstrap";
export default class Home extends React.Component{
    render(){
        return(
            <Panel>
                <Button onClick={this.props.openClippingsDialogHandler.bind(this)}>Open "My Clippings.txt"...</Button>
            </Panel>
        );
    }
}