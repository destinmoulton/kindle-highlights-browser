import React, {Component} from 'react';

import { Checkbox, FormGroup, Modal } from 'react-bootstrap';

class ClipsExportModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            includeLocation:true,
            includeDate:true
        };
    }

    changeIncludeLocationHandler(e){
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

    changeIncludeDateHandler(e){
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
    
    render() {
        const { modalIsActive, closeModalHandler } = this.props;
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Checkbox inline 
                                  checked={this.state.includeLocation} 
                                  onChange={this.changeIncludeLocationHandler.bind(this)}>
                            Include Location
                        </Checkbox>
                    </FormGroup>
                    <FormGroup>
                        <Checkbox inline 
                                  checked={this.state.includeDate}
                                  onChange={this.changeIncludeDateHandler.bind(this)}>
                            Include Date
                        </Checkbox>
                    </FormGroup>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

