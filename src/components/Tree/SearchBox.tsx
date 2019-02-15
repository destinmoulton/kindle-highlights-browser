import * as React from "react";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

interface Props {
    handleClearSearch: (e: any) => {};
    handleSearchChange: (e: any) => {};
    originalSearchString: string;
}

export default (props: Props) => {
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
                <FormControl
                    type="text"
                    placeholder="Search Authors/Titles..."
                    value={originalSearchString}
                    onChange={handleSearchChange}
                />
                <InputGroup.Append className={addonClassName}>
                    <InputGroup.Text>
                        <i className={iconClassName} onClick={iconOnChange} />
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};
