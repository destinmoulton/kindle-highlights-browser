import * as React from "react";

import { Button, Col, Modal, Row, Tabs, Tab } from "react-bootstrap";

import OptionsTab from "./Tabs/OptionsTab";
import PreviewTab from "./Tabs/PreviewTab";

import * as Types from "../../../types";

import EXPORT_OPTIONS from "../../../data/exportOptions";

interface Props {
    modalIsActive: boolean;
    closeModalHandler: () => void;
    filteredClips: Types.FilteredClips;
}

interface State {
    exportOptions: Types.ExportOptions;
}

class ExportModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            exportOptions: EXPORT_OPTIONS
        };
    }

    handleOptionChange = (group_id: string, element_id: string, evt: any) => {
        const { exportOptions } = this.state;

        const option = exportOptions[group_id]["elements"][element_id];
        if (option.type === "checkbox") {
            option.value = evt.target.checked;
        } else {
            option.value = evt.target.value;
        }

        exportOptions[group_id]["elements"][element_id] = option;

        this.setState({
            exportOptions
        });
    };

    render() {
        const { modalIsActive, closeModalHandler, filteredClips } = this.props;
        const { exportOptions } = this.state;
        return (
            <Modal show={modalIsActive} onHide={closeModalHandler} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export Clips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Tabs
                                defaultActiveKey="preview"
                                transition={false}
                                id="exportmodal-tabs"
                            >
                                <Tab eventKey="preview" title="Preview">
                                    <PreviewTab
                                        exportOptions={exportOptions}
                                        filteredClips={filteredClips}
                                    />
                                </Tab>
                                <Tab eventKey="options" title="Options">
                                    <OptionsTab
                                        options={exportOptions}
                                        changeFormOption={
                                            this.handleOptionChange
                                        }
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Button
                            onClick={closeModalHandler}
                            className="pull-right"
                        >
                            Close
                        </Button>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ExportModal;
