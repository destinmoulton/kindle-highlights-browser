import * as fs from "fs";
import * as React from "react";

import { Card, Col, Form, Modal, Row, Button } from "react-bootstrap";
import { arrayMove } from "react-sortable-hoc";
import { remote } from "electron";

import convertArrayToCSV from "convert-array-to-csv";

import ColumnReorder from "./ColumnReorder";
import { errorDialog } from "../../../lib/errorDialog";
import * as Types from "../../../types";

const FILE_EXT = ".csv";

const ClipColumns: Types.CSVColumn[] = [
    { key: "title", name: "Title" },
    { key: "authorFullName", name: "Author" },
    { key: "location", name: "Location" },
    { key: "text", name: "Text" }
];

interface IExample {
    [key: string]: string | number;
}
const Example: IExample = {
    title: "Hamlet",
    authorFullName: "Bill Shakespeare",
    location: "666-999",
    text: "To Be Or Not to Be"
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
            dateFormat: "H:mm a MMM D, YYYY"
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
        const { filteredClips } = this.props;

        let headerNames: string[] = [];
        let headerKeys: string[] = [];

        for (let col of this.state.columns) {
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
                    outRow.push(inRow[key].toString());
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

        let titleRow: React.ReactElement[] = [];
        let exampleRow: React.ReactElement[] = [];
        columns.map((column, index) => {
            const comma = index > 0 ? ", " : "";
            titleRow.push(
                <span key={"col-" + index}>
                    {comma}
                    {column.name}
                </span>
            );
            exampleRow.push(
                <span key={"ex-" + index}>
                    {comma}
                    {Example[column.key]}
                </span>
            );
        });
        return (
            <div>
                <div>{titleRow}</div>
                <div>{exampleRow}</div>
            </div>
        );
    }

    render() {
        const { columns, dateFormat } = this.state;
        const { modalIsActive, closeModalHandler, filteredClips } = this.props;
        console.log("filteredClips", filteredClips);

        const preview = this._renderPreview();
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export as CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Settings</Card.Title>
                                    <hr />
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>
                                                Column Order
                                            </Form.Label>
                                            <div className="khb-csvsort-list-wrapper">
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
                                        <hr />
                                        <Form.Group>
                                            <Form.Label>Date Format</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dateFormat}
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
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Preview</Card.Title>
                                    <hr />
                                    {preview}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._handleClickGenerate}>
                        <i className="fa fa-save" />
                        Generate CSV
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CSVModal;
