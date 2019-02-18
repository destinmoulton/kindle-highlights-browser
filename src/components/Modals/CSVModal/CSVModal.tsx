import * as React from "react";

import { Modal, Row } from "react-bootstrap";

import ColumnReorder from "./ColumnReorder";
import * as Types from "../../../types";

interface Props {
    modalIsActive: boolean;
    closeModalHandler: () => void;
    filteredClips: Types.FilteredClips;
}
class CSVModal extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { modalIsActive, closeModalHandler, filteredClips } = this.props;
        console.log("filteredClips", filteredClips);
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export as CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="khb-csvsort-list-wrapper">
                        <ColumnReorder />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default CSVModal;
