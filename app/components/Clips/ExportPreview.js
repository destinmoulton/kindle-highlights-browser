import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

class ExportPreview extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {clips, includeLocation, includeDate, clipSeparator} = this.props;
        
        let preview = "";
        clips.map(function(clip){
            if(preview !== ""){
                preview += "\n" + clipSeparator + "\n";
            }

            if(includeLocation){
                preview += `Location: ${clip.location.value}`;
            }

            if(includeLocation && includeDate){
                preview += " -- ";
            }

            if(includeDate){
                preview += `${clip.date.format("MMMM DD, YYYY h:mm:ss a")}`;
            }
            
            preview += "\n";

            preview += clip.text;
        });
        return (
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Preview Export</ControlLabel>
                <FormControl componentClass="textarea" 
                             placeholder="textarea" 
                             value={preview}
                             readOnly/>
            </FormGroup>              
        );
    }
}

export default ExportPreview;