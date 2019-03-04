import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";
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
            <Col xs="12" key={element.id}>
                <Form.Check
                    inline
                    checked={isChecked}
                    onChange={this._handleChangeInput.bind(this, element.id)}
                    value={element.id}
                    type="checkbox"
                    label={element.name}
                />
            </Col>
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
                        onChange={this._handleChangeInput.bind(
                            this,
                            element.id
                        )}
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
                <Col xs="6">
                    <Form.Control
                        as="select"
                        onChange={this._handleChangeInput.bind(
                            this,
                            element.id
                        )}
                        defaultValue={element.value}
                    >
                        {options}
                    </Form.Control>
                </Col>
            </Form.Group>
        );
    }

    render() {
        const { elements, group_name } = this.props;

        const formElements = Object.values(elements).map(element => {
            switch (element.type) {
                case "checkbox":
                    return (
                        <Row key={element.id}>
                            {this._renderCheckbox(element)}
                        </Row>
                    );
                case "text":
                    return (
                        <Row key={element.id}>{this._renderText(element)}</Row>
                    );
                case "select":
                    return (
                        <Row key={element.id}>
                            {this._renderSelect(element)}
                        </Row>
                    );
            }
        });

        return (
            <div>
                <h4>{group_name}</h4>
                {formElements}
            </div>
        );
    }
}

export default FormGenerator;
