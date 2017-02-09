import fs from 'fs';
import {EOL} from 'os';

import React, {Component} from 'react';

import { Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Modal, Row } from 'react-bootstrap';

import {clipboard,remote} from 'electron';

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

    handleCopyClips(){
        const strToCopy = GenerateClipsString(this.props.clips, this.state.checkboxes, this.state.clipSeparator, EOL);

        clipboard.writeText(strToCopy);
    }

    handleSelectAll(){
        document.getElementById('khb-exportpreview-textarea').select();
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
                            <Button onClick={this.handleSaveClipsToFile.bind(this)}>
                                <i className="fa fa-floppy-o"></i> Save All to File
                            </Button>
                            <Button onClick={this.handleCopyClips.bind(this)}>
                                <i className="fa fa-clipboard"></i> Copy All
                            </Button>
                            <Button onClick={this.handleSelectAll.bind(this)}>
                                <i className="fa fa-hand-rock-o"></i> Select All
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

