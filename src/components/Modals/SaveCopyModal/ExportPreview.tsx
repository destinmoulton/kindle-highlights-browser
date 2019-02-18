import * as React from "react";

import Form from "react-bootstrap/Form";
import * as Types from "../../../types";

import { generateClipsString } from "../../../lib/generateClipsString";
interface Props {
    exportOptions: Types.ExportOptions;
    filteredClips: Types.FilteredClips;
}
const TEXTAREA_EOL = "\n";

class ExportPreview extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { filteredClips, exportOptions } = this.props;
        const clipsPreview = generateClipsString(
            filteredClips,
            exportOptions,
            TEXTAREA_EOL
        );
        return (
            <Form>
                <Form.Group controlId="khb-exportpreview-textarea">
                    <Form.Label>Preview Export</Form.Label>
                    <Form.Control as="textarea" value={clipsPreview} readOnly />
                </Form.Group>
            </Form>
        );
    }
}

export default ExportPreview;
