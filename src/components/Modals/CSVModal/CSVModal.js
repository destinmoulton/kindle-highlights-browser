import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

class CSVModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { modalIsActive, closeModalHandler, clips } = this.props;
        console.log("clips", clips);
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export as CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row />
                </Modal.Body>
            </Modal>
        );
    }
}

CSVModal.propTypes = {
    modalIsActive: PropTypes.bool,
    closeModalHandler: PropTypes.func,
    clips: PropTypes.object
};

export default CSVModal;
