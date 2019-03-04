import * as React from "react";

import { Col, Form, Row } from "react-bootstrap";

import * as Types from "../../../../types";

interface Props {
    inputValues: Types.ExportPrefixSuffixElements;
    onChangeValue: (id: string, position: string, value: string) => void;
}

function PrefixSuffixForm(props: Props) {
    const formElements = [
        { id: "location", name: "Location/Date" },
        { id: "highlight", name: "Highlight" },
        { id: "note", name: "Note" }
    ];

    const { inputValues } = this.props;

    return formElements.map(input => {
        return (
            <Form.Group as={Row} key={input.id} size="sm">
                <Col xs="6">
                    <Form.Label column>{input.name}</Form.Label>
                </Col>
                <Col xs="6">
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Prefix"
                        onChange={this._handleOnChange.bind(
                            this,
                            input.id,
                            "prefixValue"
                        )}
                        value={inputValues[input.id]["prefixValue"]}
                    />
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Suffix"
                        onChange={this._handleOnChange.bind(
                            this,
                            input.id,
                            "suffixValue"
                        )}
                        value={inputValues[input.id]["suffixValue"]}
                    />
                </Col>
            </Form.Group>
        );
    });
}

export default PrefixSuffixForm;
