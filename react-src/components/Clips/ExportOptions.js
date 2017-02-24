import React, { Component } from 'react';

import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class ExportOptions extends Component {
    render() {
        const {checkboxes, separators, handleCheckboxChange, handleSeparatorChange} = this.props;
        
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
                    <ControlLabel>Book Title Separator</ControlLabel>
                    <FormControl
                        type="text"
                        name="title"
                        value={separators.title}
                        onChange={handleSeparatorChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Clip Separator</ControlLabel>
                    <FormControl
                        type="text"
                        name="clip"
                        value={separators.clip}
                        onChange={handleSeparatorChange}
                    />
                </FormGroup>
            </div>
        );
    }
}


export default ExportOptions;