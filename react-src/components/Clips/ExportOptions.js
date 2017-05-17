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
        const {checkboxes, radios, separators, handleCheckboxChange, handleRadioChange, handleSeparatorChange} = this.props;
        
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
                    <Checkbox inline
                        checked={checkboxes.quote}
                        onChange={handleCheckboxChange}
                        value="quote">
                        Include Quotation Marks
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
                    <Radio name="clip_separator" 
                           checked={(radios.clip_separator === "line")}
                           onChange={handleRadioChange}
                           value="line">Extra Line</Radio>
                    <Radio name="clip_separator" 
                           checked={(radios.clip_separator === "none")}
                           onChange={handleRadioChange}
                           value="none">None</Radio>
                    <Radio name="clip_separator" 
                           checked={(radios.clip_separator === "text")}
                           onChange={handleRadioChange}
                           value="text">Text
                        <FormControl
                            type="text"
                            name="clip"
                            disabled={!(radios.clip_separator === "text")}
                            value={separators.clip}
                            onChange={handleSeparatorChange}
                        />
                    </Radio>
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