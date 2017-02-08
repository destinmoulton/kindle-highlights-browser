import React, {Component} from 'react';

import { Checkbox, Col, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';

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
            <Modal show={modalIsActive} onHide={closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <FormGroup>
                        <Checkbox inline 
                                  checked={includeLocation} 
                                  onChange={this.handleIncludeLocationChange.bind(this)}>
                            Include Location
                        </Checkbox>
                    </FormGroup>
                    <FormGroup>
                        <Checkbox inline 
                                  checked={includeDate}
                                  onChange={this.handleIncludeDateChange.bind(this)}>
                            Include Date
                        </Checkbox>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Clip Separator</ControlLabel>
                        <FormControl
                            type="text"
                            value={clipSeparator}
                            onChange={this.handleSeparatorChange.bind(this)}
                        />
                    </FormGroup>
                    <ExportPreview includeLocation={includeLocation} 
                                   includeDate={includeDate}
                                   clipSeparator={clipSeparator}
                                   clips={clips}/>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

