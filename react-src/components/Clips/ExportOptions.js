import React, { Component } from 'react';

import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class ExportOptions extends Component {
    render() {
        const {checkboxes, clipSeparator} = this.props;
        const {handleCheckboxChange, handleSeparatorChange} = this.props;
        return (
            
            <div>
                <FormGroup>
                    <Checkbox inline
                        checked={checkboxes.location}
                        onChange={handleCheckboxChange}
                        value="location">
                        Include Location
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline
                        checked={checkboxes.date}
                        onChange={handleCheckboxChange}
                        value="date">
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