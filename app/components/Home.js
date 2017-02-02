import React from "react";

import {Col, Button, Panel} from "react-bootstrap";

import Help from "./Help";

export default class Home extends React.Component{
    render(){
        return(
        <Col lg={12} md={12} sm={12}>
            <Panel>
                <Button onClick={this.props.openClippingsDialogHandler.bind(this)}>Open "My Clippings.txt"...</Button>
            </Panel>
            <Help />
        </Col>
        );
    }
}