import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import {GenerateClipsString} from '../../lib/exportutilities';

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {clips, exportOptions} = this.props;
        const clipsPreview = GenerateClipsString(clips, exportOptions, TEXTAREA_EOL);
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

ExportPreview.propTypes = {
    clips:React.PropTypes.object,
    checkboxes:React.PropTypes.object,
    radios:React.PropTypes.object,
    separators:React.PropTypes.object, 
};

export default ExportPreview;