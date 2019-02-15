import fs from "fs";
import { EOL } from "os";

import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import { clipboard, remote } from "electron";
import moment from "moment";

import ExportOptions from "./ExportOptions";
import ExportPreview from "./ExportPreview";

import { generateClipsString } from "../../../lib/generateClipsString";
import { errorDialog } from "../../../lib/errorDialog";
const FILE_PREFIX = "kindle_highlights_";
const FILE_DATE_SUFFIX = moment().format("MM_DD_YYYY_HH_mm_ss");
const FILE_EXT = ".txt";

class SaveCopyModal extends Component {
    constructor(props) {
        super(props);

        const exportOptions = {
            checkboxes: {
                location: true,
                date: true,
                quote: true
            },
            separators: {
                title: "=====================================",
                clip: "--------------------------"
            },
            radios: {
                clip_separator: "line"
            }
        };

        this.state = {
            exportOptions
        };
    }

    /**
     * Handle the checkbox change event
     * when a user checks or unchecks a checkbox  (ExportOptions component)
     *
     * @param Event e
     */
    handleCheckboxChange(e) {
        let exportOptions = Object.assign({}, this.state.exportOptions);
        let chks = Object.assign({}, exportOptions.checkboxes);
        if (e.target.checked) {
            chks[e.target.value] = true;
        } else {
            chks[e.target.value] = false;
        }
        exportOptions.checkboxes = chks;
        this.setState({
            exportOptions
        });
    }

    handleRadioChange(e) {
        const targ = e.target;
        let exportOptions = Object.assign({}, this.state.exportOptions);
        let radios = Object.assign({}, exportOptions.radios);
        radios[targ.name] = targ.value;
        exportOptions.radios = radios;
        this.setState({
            exportOptions
        });
    }

    /**
     * Handle a separator change event.
     * ie When the user adds or removes characters
     * from a separator input field (ExportOptions component)
     *
     * @param Event e
     */
    handleSeparatorChange(e) {
        let exportOptions = Object.assign({}, this.state.exportOptions);
        let separators = Object.assign({}, exportOptions.separators);

        separators[e.target.name] = e.target.value;
        exportOptions.separators = separators;
        this.setState({
            exportOptions
        });
    }

    /**
     * Show the file save dialog box and save the clip
     * string to the selected file.
     */
    handleSaveClipsToFile() {
        const possibleTitle = FILE_PREFIX + FILE_DATE_SUFFIX;
        remote.dialog.showSaveDialog(
            { defaultPath: possibleTitle + FILE_EXT },
            filename => {
                if (typeof filename === "string") {
                    const strToWrite = generateClipsString(
                        this.props.clips,
                        this.state.exportOptions,
                        EOL
                    );
                    fs.writeFile(filename, strToWrite, function(err) {
                        if (err) {
                            return errorDialog(
                                "There was a problem saving the file.\n" + err
                            );
                        }
                    });
                }
            }
        );
    }

    /**
     * Copy generated clip string to the clipboard.
     */
    handleCopyClips() {
        const strToCopy = generateClipsString(
            this.props.clips,
            this.state.exportOptions,
            EOL
        );

        clipboard.writeText(strToCopy);
    }

    /**
     * Select all the clips in the textarea.
     */
    handleSelectAll() {
        document.getElementById("khb-exportpreview-textarea").select();
    }

    render() {
        const { modalIsActive, closeModalHandler, clips } = this.props;
        const { exportOptions } = this.state;
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4}>
                            <ExportOptions
                                exportOptions={exportOptions}
                                handleCheckboxChange={this.handleCheckboxChange.bind(
                                    this
                                )}
                                handleRadioChange={this.handleRadioChange.bind(
                                    this
                                )}
                                handleSeparatorChange={this.handleSeparatorChange.bind(
                                    this
                                )}
                            />
                        </Col>
                        <Col xs={8}>
                            <ExportPreview
                                exportOptions={exportOptions}
                                clips={clips}
                            />
                            <ButtonGroup>
                                <Button
                                    onClick={this.handleSaveClipsToFile.bind(
                                        this
                                    )}
                                >
                                    <i className="fa fa-floppy-o" /> Save All to
                                    File
                                </Button>
                                <Button
                                    onClick={this.handleCopyClips.bind(this)}
                                >
                                    <i className="fa fa-clipboard" /> Copy All
                                </Button>
                                <Button
                                    onClick={this.handleSelectAll.bind(this)}
                                >
                                    <i className="fa fa-hand-rock-o" /> Select
                                    All
                                </Button>
                            </ButtonGroup>
                            <Button
                                onClick={closeModalHandler}
                                className="pull-right"
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

SaveCopyModal.propTypes = {
    modalIsActive: PropTypes.bool,
    closeModalHandler: PropTypes.func,
    clips: PropTypes.object
};

export default SaveCopyModal;
