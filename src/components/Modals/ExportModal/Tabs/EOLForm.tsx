import * as React from "react";

import { Col, Form, Row } from "react-bootstrap";
import * as Types from "../../../../types";

interface Props {
    inputValues: Types.ExportPrefixSuffixElements;

    onChangeValue: (id: string, position: string, value: string) => void;
}

function EOLForm(props: Props) {
    const { inputValues } = this.props;

    const formElements = [
        { id: "location", name: "Location/Date" },
        { id: "highlight", name: "Highlight" },
        { id: "note", name: "Note" }
    ];

    let options: React.ReactElement[] = [];
    for (let i = 0; i <= 10; i++) {
        options.push(<option key={i}>{i}</option>);
    }

    return formElements.map(input => {
        return (
            <Form.Group as={Row} key={input.id} size="sm">
                <Col xs="6">
                    <Form.Label column>{input.name}</Form.Label>
                </Col>
                <Col sm="6">
                    <Form.Control
                        as="select"
                        onChange={this._handleOnChange.bind(
                            this,
                            input.id,
                            "suffixEOL"
                        )}
                        defaultValue={inputValues[input.id]["suffixEOL"]}
                    >
                        {options}
                    </Form.Control>
                </Col>
            </Form.Group>
        );
    });
}

export default EOLForm;
