import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import {GenerateClipsString} from '../../lib/exportutilities';

const TEXTAREA_EOL = "\n";
class ExportPreview extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {clips, checkboxes, radios, separators} = this.props;
        const clipsPreview = GenerateClipsString(clips, checkboxes, radios, separators, TEXTAREA_EOL);
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
    separators:React.PropTypes.object, 
};

export default ExportPreview;