import React, {Component} from 'react';

import { Checkbox, Col, ControlLabel, FormControl, FormGroup, Modal, Row } from 'react-bootstrap';

import ExportOptions from './ExportOptions';
import ExportPreview from './ExportPreview';

class ClipsExportModal extends Component {
    constructor(props){
        super(props);

        const checkboxes = {
            location:true,
            date:true
        };

        this.state = {
            checkboxes,
            clipSeparator:"--------------------------"
        };
    }

    handleCheckboxChange(e){
        let chks = this.state.checkboxes;
        if(e.target.checked){
            chks[e.target.value] = true;
        } else {
            chks[e.target.value] = false;
        }
        this.setState({
            checkboxes:chks
        });
    }

    handleSeparatorChange(e){
        this.setState({
            clipSeparator:e.target.value
        });
    }
    
    render() {
        const { modalIsActive, closeModalHandler, clips } = this.props;
        const { checkboxes, clipSeparator } = this.state;
        return (
            <Modal show={modalIsActive} 
                   onHide={closeModalHandler}
                   bsSize="large" >
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4}>
                            <ExportOptions checkboxes={checkboxes}
                                           clipSeparator={clipSeparator}
                                           handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                           handleSeparatorChange={this.handleSeparatorChange.bind(this)}/>
                        </Col>
                        <Col xs={8}>
                            <ExportPreview checkboxes={checkboxes}
                                clipSeparator={clipSeparator}
                                clips={clips} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

