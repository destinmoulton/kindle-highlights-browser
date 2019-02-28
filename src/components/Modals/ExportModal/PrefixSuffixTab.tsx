import * as React from "react";

import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";

import * as Types from "../../../types";

interface Props {
    inputValues: Types.ExportPrefixSuffixElements;
    onChangeValue: (id: string, position: string, value: string) => void;
}

class PrefixSuffixTab extends React.Component<Props> {
    _prePostInputs = [
        { id: "location", name: "Location/Date" },
        { id: "highlight", name: "Highlight" },
        { id: "note", name: "Note" }
    ];

    constructor(props: Props) {
        super(props);
    }

    _handleOnChange(id: string, position: string, evt: any) {
        this.props.onChangeValue(id, position, evt.target.value);
    }

    _renderInputGroups() {
        const { inputValues } = this.props;

        return this._prePostInputs.map(input => {
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

    _renderEOLSelects() {
        const { inputValues } = this.props;

        let options: React.ReactElement[] = [];
        for (let i = 0; i <= 10; i++) {
            options.push(<option key={i}>{i}</option>);
        }

        return this._prePostInputs.map(input => {
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

    render() {
        const inputGroups = this._renderInputGroups();
        const suffixEOLs = this._renderEOLSelects();
        return (
            <div>
                <br />
                <h5>Prefix/Suffix Text</h5>
                {inputGroups}
                <br />
                <h5>Extra Lines</h5>
                {suffixEOLs}
            </div>
        );
    }
}

export default PrefixSuffixTab;
