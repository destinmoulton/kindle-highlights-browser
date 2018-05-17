import React, { Component } from "react";
import PropTypes from "prop-types";

import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";

import { generateClipsString } from "../../lib/generateClipsString";

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {
    static propTypes = {
        clips: PropTypes.object,
        checkboxes: PropTypes.object,
        radios: PropTypes.object,
        separators: PropTypes.object
    };

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
            <FormGroup controlId="khb-exportpreview-textarea">
                <ControlLabel>Preview Export</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    placeholder="textarea"
                    value={clipsPreview}
                    readOnly
                />
            </FormGroup>
        );
    }
}

export default ExportPreview;
