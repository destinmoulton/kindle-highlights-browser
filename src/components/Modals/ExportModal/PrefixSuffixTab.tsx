import * as React from "react";

import {
    Button,
    ButtonGroup,
    Col,
    Form,
    InputGroup,
    Row
} from "react-bootstrap";

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
                <InputGroup key={input.id} size="sm">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{input.name}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
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
                        placeholder="Suffix"
                        onChange={this._handleOnChange.bind(
                            this,
                            input.id,
                            "suffixValue"
                        )}
                        value={inputValues[input.id]["suffixValue"]}
                    />
                </InputGroup>
            );
        });
    }

    render() {
        const inputGroups = this._renderInputGroups();
        return <div>{inputGroups}</div>;
    }
}

export default PrefixSuffixTab;
