import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as Types from "../../../../types";
interface Props {
    group_id: string;
    group_name: string;
    elements: Types.ExportOptionFormElements;
    changeElement: (evt: any) => void;
}
class FormGenerator extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    _renderCheckbox(element: Types.ExportOptionFormElement) {
        const isChecked = element.value === "true" || element.value === true;
        return (
            <Form.Check
                key={element.id}
                inline
                checked={isChecked}
                onChange={this.props.changeElement}
                value={element.id}
                type="checkbox"
                label="Include Location"
            />
        );
    }

    _renderText(element: Types.ExportOptionFormElement) {
        const placeholder = element.placeholder ? element.placeholder : "";
        return (
            <Form.Group as={Row} key={element.id} size="sm">
                <Col xs="6">
                    <Form.Label column>{element.name}</Form.Label>
                </Col>
                <Col xs="6">
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder={placeholder}
                        onChange={this.props.changeElement}
                        value={element.value.toString()}
                    />
                </Col>
            </Form.Group>
        );
    }

    _renderSelect(element: Types.ExportOptionFormElement) {
        let options: React.ReactElement[] = element.options.map(option => {
            return <option key={option}>{option}</option>;
        });

        return (
            <Form.Group as={Row} key={element.id} size="sm">
                <Col xs="6">
                    <Form.Label column>{element.name}</Form.Label>
                </Col>
                <Col sm="6">
                    <Form.Control
                        as="select"
                        onChange={this.props.changeElement}
                        defaultValue={element.value}
                    >
                        {options}
                    </Form.Control>
                </Col>
            </Form.Group>
        );
    }

    render() {
        const { elements } = this.props;

        return Object.values(elements).map(element => {
            switch (element.type) {
                case "checkbox":
                    return this._renderCheckbox(element);
                case "text":
                    return this._renderText(element);
                case "select":
                    return this._renderSelect(element);
            }
        });
    }
}

export default FormGenerator;
