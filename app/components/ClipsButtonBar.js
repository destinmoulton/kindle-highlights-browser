import React from "react";

import {ButtonToolbar,Button, Col, ControlLabel, Form, FormControl, Panel} from "react-bootstrap";

export default class ClipsButtonBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {sortBy, sortChangeHandler} = this.props;
        return(
            <Panel>
                <Col sm={6}>
                    <Button>Save Clips</Button>
                    <Button>Copy Clips</Button>
                </Col>
                <Form horizontal>
                <Col componentClass={ControlLabel} sm={2}>
                    Sort By:
                </Col>
                <Col sm={4}>
                    <FormControl componentClass="select"
                        onChange={sortChangeHandler}>
                        <option value="location_start|asc">Location</option>
                        <option value="unix_timestamp|asc">Date - Oldest First</option>
                        <option value="unix_timestamp|desc">Date - Newest First</option>
                    </FormControl>
                </Col>
                </Form>
            </Panel>
        );
    }
}