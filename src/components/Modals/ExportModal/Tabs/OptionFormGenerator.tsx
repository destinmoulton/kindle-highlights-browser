import * as React from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import * as Types from "../../../../types";

interface Props {
    group_id: string;
    group_name: string;
    elements: Types.ExportOptionFormElements;
    changeElement: (group_id: string, element_id: string, evt: any) => void;
}
class FormGenerator extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    _handleChangeInput = (element_id: string, evt: any) => {
        this.props.changeElement(this.props.group_id, element_id, evt);
    };

    _renderCheckbox(element: Types.ExportOptionFormElement) {
        const isChecked = element.value === "true" || element.value === true;
        return (
            <Form.Check
                inline
                checked={isChecked}
                onChange={this._handleChangeInput.bind(this, element.id)}
                value={element.id}
                type="checkbox"
                label={element.name}
            />
        );
    }

    _renderText(element: Types.ExportOptionFormElement) {
        const placeholder = element.placeholder ? element.placeholder : "";
        return (
            <Form.Control
                type="text"
                size="sm"
                placeholder={placeholder}
                onChange={this._handleChangeInput.bind(this, element.id)}
                value={element.value.toString()}
            />
        );
    }

    _renderSelect(element: Types.ExportOptionFormElement) {
        let options: React.ReactElement[] = element.options.map(option => {
            return <option key={option}>{option}</option>;
        });

        return (
            <Col xs="6">
                <Form.Control
                    as="select"
                    onChange={this._handleChangeInput.bind(this, element.id)}
                    defaultValue={element.value}
                >
                    {options}
                </Form.Control>
            </Col>
        );
    }

    render() {
        const { elements, group_name } = this.props;

        const formElements = Object.values(elements).map(element => {
            switch (element.type) {
                case "checkbox":
                    return (
                        <tr key={element.id}>
                            <td colSpan={2}>{this._renderCheckbox(element)}</td>
                        </tr>
                    );
                case "text":
                    return (
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>{this._renderText(element)}</td>
                        </tr>
                    );
                case "select":
                    return (
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>{this._renderSelect(element)}</td>
                        </tr>
                    );
            }
        });

        return (
            <div className="khb-exportmodal-options-form-container">
                <div className="khb-exportmodal-options-form-title">
                    {group_name}
                </div>
                <Table
                    className="khb-exportmodal-options-form-table"
                    bordered={false}
                    size="sm"
                >
                    {formElements}
                </Table>
            </div>
        );
    }
}

export default FormGenerator;
