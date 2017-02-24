import React, { Component } from 'react';

import {FormControl, FormGroup, InputGroup} from 'react-bootstrap';

class SearchBox extends Component {
    render() {
        const { handleSearchChange } = this.props;
        return (
            <div id='khb-treelist-filter-container'>
                <FormGroup>
                <InputGroup>
                    <FormControl type="text" placeholder="Search Authors/Titles..." onChange={handleSearchChange}/>
                    <InputGroup.Addon><i className='fa fa-search'></i></InputGroup.Addon>
                </InputGroup>
                </FormGroup>
            </div>
        );
    }
}

export default SearchBox;