import React, {Component} from 'react';

import { Checkbox, Col, ControlLabel, FormControl, FormGroup, Modal, Row } from 'react-bootstrap';

import ExportOptions from './ExportOptions';
import ExportPreview from './ExportPreview';

class ClipsExportModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            includeLocation:true,
            includeDate:true,
            clipSeparator:"--------------------------"
        };
    }

    handleIncludeLocationChange(e){
        if(e.target.checked){
            this.setState({
                includeLocation:true
            });
        } else {
            this.setState({
                includeLocation:false
            });
        }
    }

    handleIncludeDateChange(e){
        if(e.target.checked){
            this.setState({
                includeDate:true
            });
        } else {
            this.setState({
                includeDate:false
            });
        }
    }

    handleSeparatorChange(e){
        this.setState({
            clipSeparator:e.target.value
        });
    }
    
    render() {
        const { modalIsActive, closeModalHandler, clips } = this.props;
        const { includeDate, includeLocation, clipSeparator } = this.state;
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
                            <ExportOptions includeDate={includeDate}
                                           includeLocation={includeLocation}
                                           clipSeparator={clipSeparator}
                                           handleIncludeLocationChange={this.handleIncludeLocationChange.bind(this)}
                                           handleIncludeDateChange={this.handleIncludeDateChange.bind(this)}
                                           handleSeparatorChange={this.handleSeparatorChange.bind(this)}/>
                        </Col>
                        <Col xs={8}>
                            <ExportPreview includeLocation={includeLocation}
                                includeDate={includeDate}
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

