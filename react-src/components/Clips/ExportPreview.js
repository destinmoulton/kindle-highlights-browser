import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

import { generateClipsString } from "../../lib/generateClipsString";

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { clips, exportOptions } = this.props;
        const clipsPreview = generateClipsString(
            clips,
            exportOptions,
            TEXTAREA_EOL
        );
        return (
            <Form>
                <Form.Group controlId="khb-exportpreview-textarea">
                    <Form.Label>Preview Export</Form.Label>
                    <Form.Control
                        type="textarea"
                        placeholder="textarea"
                        value={clipsPreview}
                        readOnly
                    />
                </Form.Group>
            </Form>
        );
    }
}

ExportPreview.propTypes = {
    clips: PropTypes.object,
    checkboxes: PropTypes.object,
    radios: PropTypes.object,
    separators: PropTypes.object
};
export default ExportPreview;
