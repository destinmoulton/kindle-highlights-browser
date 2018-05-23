import React from "react";

import { Col, Button, Panel } from "react-bootstrap";

import Help from "./Help";

function Home(props) {
    return (
        <Col lg={12} md={12} sm={12}>
            <Panel className="khb-home-panel text-center">
                <Button onClick={props.openClippingsDialogHandler}>
                    Open "My Clippings.txt"...
                </Button>
            </Panel>
            <Help />
        </Col>
    );
}

export default Home;
