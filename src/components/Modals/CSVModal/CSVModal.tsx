import * as React from "react";

import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { arrayMove } from "react-sortable-hoc";

import ColumnReorder from "./ColumnReorder";
import * as Types from "../../../types";

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

    _renderPreview() {
        const { columns, dateFormat } = this.state;

        let titleRow: React.ReactElement[] = [];
        let exampleRow: React.ReactElement[] = [];
        columns.map((column, index) => {
            const comma = index > 0 ? ", " : "";
            titleRow.push(
                <span>
                    {comma}
                    {column.name}
                </span>
            );
            exampleRow.push(
                <span>
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
            </Modal>
        );
    }
}

export default CSVModal;
