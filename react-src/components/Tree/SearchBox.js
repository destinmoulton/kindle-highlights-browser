import React, { Component } from "react";
import PropTypes from "prop-types";

import { FormControl, FormGroup, InputGroup } from "react-bootstrap";

class SearchBox extends Component {
    static propTypes = {
        handleSearchChange: PropTypes.func,
        originalSearchString: PropTypes.string,
        handleClearSearch: PropTypes.func
    };

    render() {
        const {
            handleSearchChange,
            originalSearchString,
            handleClearSearch
        } = this.props;

        let iconClassName = "fa fa-search";
        let iconOnChange = handleSearchChange;
        let addonClassName = "";
        if (originalSearchString != "") {
            addonClassName = "khb-treelist-search-close-icon";
            iconClassName = "fa fa-times";
            iconOnChange = handleClearSearch;
        }
        return (
            <div id="khb-treelist-search-container">
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search Authors/Titles..."
                            value={originalSearchString}
                            onChange={handleSearchChange}
                        />
                        <InputGroup.Addon className={addonClassName}>
                            <i
                                className={iconClassName}
                                onClick={iconOnChange}
                            />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }
}

export default SearchBox;
