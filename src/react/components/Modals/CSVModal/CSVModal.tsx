import * as fs from "fs";
import * as React from "react";

import { Card, Col, Form, Modal, Row, Button } from "react-bootstrap";
import { arrayMove } from "react-sortable-hoc";
import { remote } from "electron";

import convertArrayToCSV from "convert-array-to-csv";

import ColumnReorder from "./ColumnReorder";
import { errorDialog } from "../../../lib/errorDialog";
import * as Types from "../../../types";
import moment = require("moment");

const FILE_EXT = ".csv";

const ClipColumns: Types.CSVColumn[] = [
    { key: "highlight", name: "Highlight" },
    { key: "note", name: "Note" },
    {
        key: "location",
        name: "Location"
    },
    {
        key: "date",
        name: "Date"
    },
    { key: "title", name: "Title" },
    { key: "authorFullName", name: "Author" }
];

interface IExample {
    [key: string]: any;
}
const Example: IExample = {
    highlight: "To Comma, Or Not to Comma",
    note: "Classic line!",
    location: { type: "highlight-with-note", value: "555-666" },
    date: moment(),
    title: "Hamlet",
    authorFullName: "Bill Shakespeare"
};

interface Props {
    modalIsActive: boolean;
    closeModalHandler: () => void;
    filteredClips: Types.FilteredClips;
}

interface State {
    columns: Types.CSVColumn[];
    dateFormat: string;
}

class CSVModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            columns: ClipColumns,
            dateFormat: "h:mm a MMM D, YYYY"
        };
    }

    _handleSortEnd = ({
        oldIndex,
        newIndex
    }: {
        oldIndex: number;
        newIndex: number;
    }) => {
        this.setState(({ columns }) => ({
            columns: arrayMove(columns, oldIndex, newIndex)
        }));
    };

    _handleChangeDateFormat = (e: any) => {
        const dateFormat = e.target.value;
        this.setState({
            dateFormat
        });
    };

    _handleClickGenerate = (e: any) => {
        const { columns, dateFormat } = this.state;
        const { filteredClips } = this.props;

        let headerNames: string[] = [];
        let headerKeys: string[] = [];

        for (let col of columns) {
            headerNames.push(col.name);
            headerKeys.push(col.key);
        }

        const titles = Object.keys(filteredClips);
        const possibleTitle = titles[0].substr(0, 25);

        let exportable: string[][] = [];
        for (let title of titles) {
            for (let inRow of filteredClips[title]) {
                let outRow = [];
                for (let key of headerKeys) {
                    let content = "";
                    if (key === "date") {
                        content = inRow[key].format(dateFormat);
                    } else if (key === "location") {
                        content = `Location ${inRow[key].value}`;
                    } else {
                        content = inRow[key].toString();
                    }
                    outRow.push(content);
                }
                exportable.push(outRow);
            }
        }

        remote.dialog.showSaveDialog(
            { defaultPath: possibleTitle + FILE_EXT },
            filename => {
                const csvStr = convertArrayToCSV(exportable, {
                    header: headerNames
                });
                if (typeof filename === "string") {
                    fs.writeFile(filename, csvStr, function(err) {
                        if (err) {
                            return errorDialog(
                                "There was a problem saving the file.\n" + err
                            );
                        }
                    });
                }
            }
        );
    };

    _renderPreview() {
        const { columns, dateFormat } = this.state;

        let titleRow: string[] = [];
        let csvRow: string[] = [];
        columns.map((column, index) => {
            titleRow.push(column.name);

            let content = "";
            if (column.key === "date") {
                content = Example[column.key].format(dateFormat);
            } else if (column.key === "location") {
                content = Example[column.key].value;
            } else {
                content = Example[column.key];
            }
            csvRow.push(content);
        });

        return convertArrayToCSV([csvRow], { header: titleRow });
    }

    render() {
        const { columns, dateFormat } = this.state;
        const { modalIsActive, closeModalHandler, filteredClips } = this.props;

        const preview = this._renderPreview();
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export as CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={8}>
                            <Card className="khb-csvmodal-option-card">
                                <Card.Body className="khb-csvmodal-option-card-body">
                                    <Form>
                                        <Form.Group className="khb-csvmodal-formgroup">
                                            <Form.Label>
                                                Column Order
                                            </Form.Label>
                                            <div className="khb-csvmodal-sort-list-wrapper">
                                                <ColumnReorder
                                                    columns={columns}
                                                    onSortEnd={
                                                        this._handleSortEnd
                                                    }
                                                />
                                            </div>
                                            <Form.Text>
                                                Drag to Reorder
                                            </Form.Text>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={4}>
                            <Card className="khb-csvmodal-option-card">
                                <Card.Body className="khb-csvmodal-option-card-body">
                                    <Form>
                                        <Form.Group className="khb-csvmodal-formgroup">
                                            <Form.Label>Date Format</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dateFormat}
                                                size="sm"
                                                onChange={
                                                    this._handleChangeDateFormat
                                                }
                                            />
                                            <Form.Text>
                                                Uses Moment Date Formatting
                                            </Form.Text>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row id="khb-csvmodal-preview-row">
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Form.Group
                                        className="khb-csvmodal-formgroup"
                                        controlId="khb-csvmodal-preview-textarea"
                                    >
                                        <Form.Label>CSV Preview</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={preview}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={this._handleClickGenerate}
                    >
                        <i className="fa fa-save" />
                        {"  "}
                        Generate CSV
                    </Button>
                    <Button
                        onClick={closeModalHandler}
                        className="float-right"
                        variant="outline-secondary"
                        size="sm"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CSVModal;
