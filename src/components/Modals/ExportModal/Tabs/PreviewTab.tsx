import * as React from "react";

import { Form } from "react-bootstrap";
import * as Types from "../../../../types";

import PreviewGenerator from "../../../../lib/PreviewGenerator";
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

        const previewGenerator = new PreviewGenerator(
            exportOptions,
            TEXTAREA_EOL
        );

        const clipsPreview = previewGenerator.generate(filteredClips);

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
