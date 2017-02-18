import React, { Component } from 'react';

import {FormControl, FormGroup, InputGroup} from 'react-bootstrap';

class Filter extends Component {
    render() {
        return (
            <div id='khb-treelist-filter-container'>
                <FormGroup>
                <InputGroup>
                    <FormControl type="text" placeholder="Search..."/>
                    <InputGroup.Addon><i className='fa fa-search'></i></InputGroup.Addon>
                </InputGroup>
                </FormGroup>
            </div>
        );
    }
}

export default Filter;