import React, { Component } from 'react';

import {FormControl, FormGroup, InputGroup} from 'react-bootstrap';

class SearchBox extends Component {
    static propTypes = {
        handleSearchChange:React.PropTypes.func,
        originalSearchString:React.PropTypes.string,
        handleClearSearch:React.PropTypes.func
    }

    render() {
        const { handleSearchChange, originalSearchString, handleClearSearch } = this.props;

        let iconClassName = "fa fa-search";
        let iconOnChange = handleSearchChange;
        let addonClassName = "";
        if(originalSearchString != ""){
            addonClassName = "khb-treelist-search-close-icon";
            iconClassName = "fa fa-times";
            iconOnChange = handleClearSearch;
        }
        return (
            <div id='khb-treelist-search-container'>
                <FormGroup>
                <InputGroup>
                    <FormControl type="text" 
                                 placeholder="Search Authors/Titles..."
                                 value={originalSearchString}
                                 onChange={handleSearchChange}/>
                    <InputGroup.Addon className={addonClassName}>
                        <i className={iconClassName} onClick={iconOnChange}></i>
                    </InputGroup.Addon>
                </InputGroup>
                </FormGroup>
            </div>
        );
    }
}

export default SearchBox;