import * as React from "react";

import { Form } from "react-bootstrap";
import * as Types from "../../../../types";

interface Props {
    exportOptions: Types.ExportOptions;
    handleCheckboxChange: () => void;
    handleRadioChange: () => void;
    handleSeparatorChange: () => void;
}

function OptionsLeftForm(props: Props) {
    const {
        exportOptions,
        handleCheckboxChange,
        handleRadioChange,
        handleSeparatorChange
    } = props;
    const { checkboxes, radios, separators } = exportOptions;
    return (
        <Form>
            <Form.Group>
                <Form.Check
                    inline
                    checked={checkboxes.location}
                    onChange={handleCheckboxChange}
                    value="location"
                    type="checkbox"
                    label="Include Location"
                />

                <Form.Check
                    inline
                    checked={checkboxes.date}
                    onChange={handleCheckboxChange}
                    value="date"
                    type="checkbox"
                    label="Include Date"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Book Title Separator</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={separators.title}
                    onChange={handleSeparatorChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Clip Separator</Form.Label>
                <Form.Check
                    name="clip_separator"
                    checked={radios.clip_separator === "line"}
                    onChange={handleRadioChange}
                    value="line"
                    type="radio"
                    label="Extra Line"
                />
                <Form.Check
                    name="clip_separator"
                    checked={radios.clip_separator === "none"}
                    onChange={handleRadioChange}
                    value="none"
                    type="radio"
                    label="None"
                />
                <Form.Check
                    name="clip_separator"
                    checked={radios.clip_separator === "text"}
                    onChange={handleRadioChange}
                    value="text"
                    type="radio"
                    label="Text"
                />
                <Form.Control
                    type="text"
                    name="clip"
                    disabled={!(radios.clip_separator === "text")}
                    value={separators.clip}
                    onChange={handleSeparatorChange}
                />
            </Form.Group>
        </Form>
    );
}

export default OptionsLeftForm;
