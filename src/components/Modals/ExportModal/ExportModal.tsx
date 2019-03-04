import * as fs from "fs";
import { EOL } from "os";

import * as React from "react";

import {
    Button,
    ButtonGroup,
    Col,
    Modal,
    Row,
    Tabs,
    Tab
} from "react-bootstrap";

import { clipboard, remote } from "electron";
import * as moment from "moment";

import OptionsTab from "./Tabs/OptionsTab";
import PreviewTab from "./Tabs/PreviewTab";

import PreviewGenerator from "../../../lib/PreviewGenerator";
import { errorDialog } from "../../../lib/errorDialog";
import * as Types from "../../../types";

import EXPORT_OPTIONS from "../../../data/exportOptions";

const FILE_PREFIX = "kindle_highlights_";
const FILE_DATE_SUFFIX = moment().format("MM_DD_YYYY_HH_mm_ss");
const FILE_EXT = ".txt";

interface Props {
    modalIsActive: boolean;
    closeModalHandler: () => void;
    filteredClips: Types.FilteredClips;
}

interface State {
    exportOptions: Types.ExportOptions;
}

class ExportModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            exportOptions: EXPORT_OPTIONS
        };
    }

    handleOptionChange = (group_id: string, element_id: string, evt: any) => {
        const { exportOptions } = this.state;

        const option = exportOptions[group_id]["elements"][element_id];
        if (option.type === "checkbox") {
            option.value = evt.target.checked;
        } else {
            option.value = evt.target.value;
        }

        exportOptions[group_id]["elements"][element_id] = option;

        this.setState({
            exportOptions
        });
    };

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
                    const previewGenerator = new PreviewGenerator(
                        this.state.exportOptions,
                        EOL
                    );
                    const strToWrite = previewGenerator.generate(
                        this.props.filteredClips
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
        const previewGenerator = new PreviewGenerator(
            this.state.exportOptions,
            EOL
        );
        const strToCopy = previewGenerator.generate(this.props.filteredClips);

        clipboard.writeText(strToCopy);
    }

    /**
     * Select all the clips in the textarea.
     */
    handleSelectAll() {
        const el: HTMLInputElement = document.getElementById(
            "khb-exportpreview-textarea"
        ) as HTMLInputElement;
        el.select();
    }

    render() {
        const { modalIsActive, closeModalHandler, filteredClips } = this.props;
        const { exportOptions } = this.state;
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Tabs
                                defaultActiveKey="preview"
                                transition={false}
                                id="exportmodal-tabs"
                            >
                                <Tab eventKey="preview" title="Preview">
                                    <PreviewTab
                                        exportOptions={exportOptions}
                                        filteredClips={filteredClips}
                                    />
                                </Tab>
                                <Tab eventKey="options" title="Options">
                                    <OptionsTab
                                        options={exportOptions}
                                        changeFormOption={
                                            this.handleOptionChange
                                        }
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button
                                onClick={this.handleSaveClipsToFile.bind(this)}
                            >
                                <i className="fa fa-save" /> Save All to File
                            </Button>
                            <Button onClick={this.handleCopyClips.bind(this)}>
                                <i className="fa fa-clipboard" /> Copy All
                            </Button>
                            <Button onClick={this.handleSelectAll.bind(this)}>
                                <i className="fa fa-hand-rock" /> Select All
                            </Button>
                        </ButtonGroup>
                        <Button
                            onClick={closeModalHandler}
                            className="pull-right"
                        >
                            Close
                        </Button>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ExportModal;
