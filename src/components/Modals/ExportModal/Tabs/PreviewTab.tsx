import * as fs from "fs";
import { EOL } from "os";
import * as React from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { clipboard, remote } from "electron";
import * as moment from "moment";

import { errorDialog } from "../../../../lib/errorDialog";
import PreviewGenerator from "../../../../lib/PreviewGenerator";
import * as Types from "../../../../types";

interface Props {
    exportOptions: Types.ExportOptions;
    filteredClips: Types.FilteredClips;
}
const TEXTAREA_EOL = "\n";
const FILE_PREFIX = "kindle_highlights_";
const FILE_DATE_SUFFIX = moment().format("MM_DD_YYYY_HH_mm_ss");
const FILE_EXT = ".txt";

class PreviewTab extends React.Component<Props> {
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
                        this.props.exportOptions,
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
            this.props.exportOptions,
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
            "khb-exportmodal-preview-textarea"
        ) as HTMLInputElement;
        el.select();
    }
    render() {
        const { filteredClips, exportOptions } = this.props;

        const previewGenerator = new PreviewGenerator(
            exportOptions,
            TEXTAREA_EOL
        );

        const clipsPreview = previewGenerator.generate(filteredClips);

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <ButtonGroup id="khb-exportmodal-preview-buttonbar">
                            <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={this.handleSaveClipsToFile.bind(this)}
                            >
                                <i className="fa fa-save" /> Save All to File
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={this.handleCopyClips.bind(this)}
                            >
                                <i className="fa fa-clipboard" /> Copy All
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={this.handleSelectAll.bind(this)}
                            >
                                <i className="fa fa-hand-rock" /> Select All
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Form.Group controlId="khb-exportmodal-preview-textarea">
                            <Form.Control
                                as="textarea"
                                value={clipsPreview}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PreviewTab;
