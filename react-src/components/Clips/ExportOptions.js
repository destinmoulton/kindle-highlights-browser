import React, { Component } from 'react';

import { 
    Checkbox, 
    ControlLabel, 
    FormControl, 
    FormGroup,
    Radio
} from 'react-bootstrap';

class ExportOptions extends Component {
    render() {
        const {checkboxes, radios, separators, handleCheckboxChange, handleSeparatorChange} = this.props;
        
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
                    <Radio name="clipSeparator" 
                           checked={radios.separator === "none"}>None</Radio>
                    <Radio name="clipSeparator" 
                           checked={radios.separator === "text"}>Text
                        <FormControl
                            type="text"
                            name="clip"
                            value={separators.clip}
                            onChange={handleSeparatorChange}
                        />
                    </Radio>
                    <Radio name="clipSeparator" 
                           checked={radios.separator === "eol"}
                           onChange={handleRadioChange}
                           value="eol">Extra Line</Radio>
                    
                </FormGroup>
            </div>
        );
    }
}

ExportOptions.propTypes = {
    checkboxes:React.PropTypes.object,
    separators:React.PropTypes.object, 
    handleCheckboxChange:React.PropTypes.func, 
    handleSeparatorChange:React.PropTypes.func
};
export default ExportOptions;