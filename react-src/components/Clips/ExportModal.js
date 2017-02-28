import fs from 'fs';
import {EOL} from 'os';

import React, {Component} from 'react';

import { Button, 
         ButtonGroup,
         Checkbox, 
         Col, 
         ControlLabel, 
         FormControl, 
         FormGroup, 
         Modal, 
         Row } from 'react-bootstrap';

import {clipboard,remote} from 'electron';

import ExportOptions from './ExportOptions';
import ExportPreview from './ExportPreview';

import {GenerateClipsString, CleanTitle} from '../../lib/exportutilities';
import {ErrorDialog} from '../../lib/dialogboxes';

const FILE_EXT = ".txt";
class ClipsExportModal extends Component {
    constructor(props){
        super(props);

        const checkboxes = {
            location:true,
            date:true
        };

        const separators = {
            title:"=====================================",
            clip:"--------------------------"
        };

        this.state = {
            checkboxes,
            separators
        };
    }

    /**
     * Handle the checkbox change event
     * when a user checks or unchecks a checkbox  (ExportOptions component)
     * 
     * @param Event e
     */
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

    /**
     * Handle a separator change event.
     * ie When the user adds or removes characters
     * from a separator input field (ExportOptions component)
     * 
     * @param Event e
     */
    handleSeparatorChange(e){
        let separators = this.state.separators;

        separators[e.target.name] = e.target.value;
        this.setState({
            separators
        });
    }

    /**
     * Show the file save dialog box and save the clip
     * string to the selected file.
     */
    handleSaveClipsToFile(){
        const self = this;

        const possibleTitle = CleanTitle(self.props.filterContent);
        remote.dialog.showSaveDialog({defaultPath:possibleTitle+FILE_EXT}, function(filename){
            const strToWrite = GenerateClipsString(self.props.clips, self.state.checkboxes, self.state.clipSeparator, EOL);
            fs.writeFile(filename, strToWrite, function(err){
                if(err){
                    return ErrorDialog("There was a problem saving the file.\n"+err);
                }
            });
            
        });
    }

    /**
     * Copy generated clip string to the clipboard.
     */
    handleCopyClips(){
        const strToCopy = GenerateClipsString(this.props.clips, this.state.checkboxes, this.state.clipSeparator, EOL);

        clipboard.writeText(strToCopy);
    }

    /**
     * Select all the clips in the textarea.
     */
    handleSelectAll(){
        document.getElementById('khb-exportpreview-textarea').select();
    }
    
    render() {
        const { modalIsActive, closeModalHandler, clips } = this.props;
        const { checkboxes, separators } = this.state;
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
                                           separators={separators}
                                           handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                           handleSeparatorChange={this.handleSeparatorChange.bind(this)}/>
                        </Col>
                        <Col xs={8}>
                            <ExportPreview checkboxes={checkboxes}
                                separators={separators}
                                clips={clips} />
                            <ButtonGroup>
                                <Button onClick={this.handleSaveClipsToFile.bind(this)}>
                                    <i className="fa fa-floppy-o"></i> Save All to File
                                </Button>
                                <Button onClick={this.handleCopyClips.bind(this)}>
                                    <i className="fa fa-clipboard"></i> Copy All
                                </Button>
                                <Button onClick={this.handleSelectAll.bind(this)}>
                                    <i className="fa fa-hand-rock-o"></i> Select All
                                </Button>
                            </ButtonGroup>
                            <Button onClick={closeModalHandler} className="pull-right">
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ClipsExportModal;

