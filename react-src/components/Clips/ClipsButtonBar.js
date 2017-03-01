import React from "react";

import {ButtonToolbar,Button, Col, ControlLabel, Form, FormControl, Panel} from "react-bootstrap";

import ExportModal from "./ExportModal";

class ClipsButtonBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsActive:false
        };
    }

    /**
     * Show the modal window by changing the
     * state.
     */
    openModal(){
        this.setState({
            modalIsActive:true
        });
    }

    /**
     * Close the modal window by changing the
     * state.
     */
    closeModal(){
        this.setState({
            modalIsActive:false
        });
    }

    render(){
        const {sortChangeHandler, clips, activeTitle} = this.props;
        return(
            <div>
                <ExportModal closeModalHandler={this.closeModal.bind(this)} 
                                  modalIsActive={this.state.modalIsActive}
                                  clips={clips}
                                  activeTitle={activeTitle}/>
                <Panel>
                    <Col sm={6}>
                        <Button onClick={this.openModal.bind(this)}>Save or Copy Clips</Button>
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
            </div>
        );
    }
}

ClipsButtonBar.propTypes = { 
    sortChangeHandler:React.PropTypes.func, 
    clips:React.PropTypes.object, 
    activeTitle:React.PropTypes.string 
};

export default ClipsButtonBar;