import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import {GenerateClipsString} from '../../lib/exportutilities';

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {clips, checkboxes, separators} = this.props;
        const clipsPreview = GenerateClipsString(clips, checkboxes, separators, TEXTAREA_EOL);
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