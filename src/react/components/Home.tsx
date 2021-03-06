import * as React from "react";

import { Button, Card, Col } from "react-bootstrap";

import Help from "./Help";

interface Props {
    openClippingsDialogHandler: (e: any) => {};
}
function Home(props: Props) {
    return (
        <Col lg={12} md={12} sm={12}>
            <Card className="khb-home-panel text-center">
                <Card.Body>
                    <Button onClick={props.openClippingsDialogHandler}>
                        Open "My Clippings.txt"...
                    </Button>
                </Card.Body>
            </Card>
            <Help />
        </Col>
    );
}

export default Home;
