import fs from 'fs';
import {EOL} from 'os';

import React, {Component} from 'react';

import { Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Modal, Row } from 'react-bootstrap';

import {remote} from 'electron';

import ExportOptions from './ExportOptions';
import ExportPreview from './ExportPreview';

import {GenerateClipsString, CleanTitle} from '../../lib/exportutilities';

const FILE_EXT = ".txt";
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

    handleSaveClipsToFile(){
        const self = this;

        const possibleTitle = CleanTitle(self.props.activeTitle);
        remote.dialog.showSaveDialog({defaultPath:possibleTitle+FILE_EXT}, function(filename){
            const strToWrite = GenerateClipsString(self.props.clips, self.state.checkboxes, self.state.clipSeparator, EOL);
            fs.writeFile(filename, strToWrite, function(err){
                if(err){
                    return console.log("There was an error writing the file.");
                }
                console.log(filename, "written correctly");
            });
            
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
                            <Button onClick={this.handleSaveClipsToFile.bind(this)}>Save to File</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

