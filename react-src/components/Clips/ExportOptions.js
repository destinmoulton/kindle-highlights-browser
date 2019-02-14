import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

function ExportOptions(props) {
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
                >
                    Include Location
                </Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    inline
                    checked={checkboxes.date}
                    onChange={handleCheckboxChange}
                    value="date"
                >
                    Include Date
                </Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    inline
                    checked={checkboxes.quote}
                    onChange={handleCheckboxChange}
                    value="quote"
                >
                    Include Quotation Marks
                </Form.Check>
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
                >
                    Extra Line
                </Form.Check>
                <Form.Check
                    name="clip_separator"
                    checked={radios.clip_separator === "none"}
                    onChange={handleRadioChange}
                    value="none"
                    type="radio"
                >
                    None
                </Form.Check>
                <Form.Check
                    name="clip_separator"
                    checked={radios.clip_separator === "text"}
                    onChange={handleRadioChange}
                    value="text"
                    type="radio"
                >
                    Text
                    <Form.Control
                        type="text"
                        name="clip"
                        disabled={!(radios.clip_separator === "text")}
                        value={separators.clip}
                        onChange={handleSeparatorChange}
                    />
                </Form.Check>
            </Form.Group>
        </Form>
    );
}

ExportOptions.propTypes = {
    exportOptions: PropTypes.object,
    handleCheckboxChange: PropTypes.func,
    handleSeparatorChange: PropTypes.func
};

export default ExportOptions;
