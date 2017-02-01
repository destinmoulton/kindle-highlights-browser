import React from "react";

import {Button, Navbar, Nav, NavItem} from "react-bootstrap";

export default class Menu extends React.Component {

    render(){
        
        return (
            <Navbar>
                <Nav>
                    <NavItem ><Button onClick={this.props.openClippingsDialogHandler.bind(this)}>Open "My Clippings.txt"...</Button></NavItem>
                </Nav>
            </Navbar>
        );
    }
}