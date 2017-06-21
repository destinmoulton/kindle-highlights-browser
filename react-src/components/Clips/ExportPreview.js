import React, { Component } from 'react';

import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import { generateClipsString } from '../../lib/generateClipsString';

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {

    static propTypes = {
        clips:React.PropTypes.object,
        checkboxes:React.PropTypes.object,
        radios:React.PropTypes.object,
        separators:React.PropTypes.object, 
    };

    constructor(props){
        super(props);
    }

    render() {
        const {clips, exportOptions} = this.props;
        const clipsPreview = generateClipsString(clips, exportOptions, TEXTAREA_EOL);
        return (
            <FormGroup controlId="khb-exportpreview-textarea">
                <ControlLabel>Preview Export</ControlLabel>
                <FormControl componentClass="textarea" 
                             placeholder="textarea" 
                             value={clipsPreview}
                             readOnly/>
            </FormGroup>              
        );
    }
}

export default ExportPreview;