import * as React from "react";

import {
    Button,
    ButtonGroup,
    Col,
    FormControl,
    InputGroup,
    Row
} from "react-bootstrap";

import ExportModal from "../Modals/ExportModal/ExportModal";
import CSVModal from "../Modals/CSVModal/CSVModal";
import * as Types from "../../types";

interface Props {
    sortChangeHandler: () => void;
    filteredClips: Types.FilteredClips;
}

interface State {
    [key: string]: boolean;
}

class ClipsButtonBar extends React.Component<Props, State> {
    constructor(props: Props) {
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
    openModal(modalName: string) {
        this.setState({
            [modalName]: true
        });
    }

    /**
     * Close the modal window by changing the
     * state.
     */
    closeModal(modalName: string) {
        this.setState({
            [modalName]: false
        });
    }

    render() {
        const { sortChangeHandler, filteredClips } = this.props;
        return (
            <div className="khb-clipslist-buttonbar">
                <ExportModal
                    closeModalHandler={this.closeModal.bind(
                        this,
                        "scModalIsOpen"
                    )}
                    modalIsActive={this.state.scModalIsOpen}
                    filteredClips={filteredClips}
                />
                <CSVModal
                    closeModalHandler={this.closeModal.bind(
                        this,
                        "csvModalIsOpen"
                    )}
                    modalIsActive={this.state.csvModalIsOpen}
                    filteredClips={filteredClips}
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
                                <i className="fa fa-save" /> Export
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

export default ClipsButtonBar;
