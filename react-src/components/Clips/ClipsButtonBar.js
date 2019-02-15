import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import Row from "react-bootstrap/Row";

import SaveCopyModal from "./SaveCopyModal/SaveCopyModal";

class ClipsButtonBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scModalIsOpen: false,
            csvModalIsOpen: false
        };
    }

    /**
     * Show the modal window by changing the
     * state.
     */
    openModal(modalName) {
        this.setState({
            [modalName]: true
        });
    }

    /**
     * Close the modal window by changing the
     * state.
     */
    closeModal(modalName) {
        this.setState({
            [modalName]: false
        });
    }

    render() {
        const { sortChangeHandler, clips } = this.props;
        return (
            <div className="khb-clipslist-buttonbar">
                <SaveCopyModal
                    closeModalHandler={this.closeModal.bind(
                        this,
                        "scModalIsOpen"
                    )}
                    modalIsActive={this.state.scModalIsOpen}
                    clips={clips}
                />
                <Row>
                    <Col xs={6}>
                        <ButtonGroup>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={this.openModal.bind(
                                    this,
                                    "scModalIsOpen"
                                )}
                            >
                                <i className="fa fa-save" /> Save or Copy
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={this.openModal.bind(
                                    this,
                                    "csvModalIsOpen"
                                )}
                            >
                                <i className="fa fa-file-csv" /> CSV File
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={6}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Sort By:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={sortChangeHandler}
                                as="select"
                            >
                                <option value="location_start|asc">
                                    Location
                                </option>
                                <option value="unix_timestamp|asc">
                                    Date - Oldest First
                                </option>
                                <option value="unix_timestamp|desc">
                                    Date - Newest First
                                </option>
                            </FormControl>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

ClipsButtonBar.propTypes = {
    sortChangeHandler: PropTypes.func,
    clips: PropTypes.object
};

export default ClipsButtonBar;
