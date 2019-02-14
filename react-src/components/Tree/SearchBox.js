import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
export default props => {
    const {
        handleSearchChange,
        originalSearchString,
        handleClearSearch
    } = props;

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
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search Authors/Titles..."
                    value={originalSearchString}
                    onChange={handleSearchChange}
                />
                <InputGroup.Append className={addonClassName}>
                    <i className={iconClassName} onClick={iconOnChange} />
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};
