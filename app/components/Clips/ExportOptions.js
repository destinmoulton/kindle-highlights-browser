import React, { Component } from 'react';

import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class ExportOptions extends Component {
    render() {
        const {includeLocation, includeDate, clipSeparator} = this.props;
        const {handleIncludeLocationChange, handleIncludeDateChange, handleSeparatorChange} = this.props;
        return (
            
            <div>
                <FormGroup>
                    <Checkbox inline
                        checked={includeLocation}
                        onChange={handleIncludeLocationChange}>
                        Include Location
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline
                        checked={includeDate}
                        onChange={handleIncludeDateChange}>
                        Include Date
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Clip Separator</ControlLabel>
                    <FormControl
                        type="text"
                        value={clipSeparator}
                        onChange={handleSeparatorChange}
                    />
                </FormGroup>
            </div>
        );
    }
}


export default ExportOptions;