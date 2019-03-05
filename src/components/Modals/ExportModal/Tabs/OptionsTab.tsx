import * as React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import * as Types from "../../../../types";
import OptionFormGenerator from "./OptionFormGenerator";

interface Props {
    options: Types.ExportOptions;
    changeFormOption: (group_id: string, element_id: string, evt: any) => void;
}

function OptionsTab(props: Props) {
    const { options, changeFormOption } = props;

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="title">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="title">Title</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="location">Location</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="highlights">
                                Highlights
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="notes">Notes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="clip_separator">
                                Clip Separator
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="title">
                            <OptionFormGenerator
                                changeElement={changeFormOption}
                                group_id="title"
                                group_name={options.title.group_name}
                                elements={options.title.elements}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="location">
                            <OptionFormGenerator
                                changeElement={changeFormOption}
                                group_id="location"
                                group_name={options.location.group_name}
                                elements={options.location.elements}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="highlights">
                            <OptionFormGenerator
                                changeElement={changeFormOption}
                                group_id="highlights"
                                group_name={options.highlights.group_name}
                                elements={options.highlights.elements}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="notes">
                            <OptionFormGenerator
                                changeElement={changeFormOption}
                                group_id="notes"
                                group_name={options.notes.group_name}
                                elements={options.notes.elements}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="clip_separator">
                            <OptionFormGenerator
                                changeElement={changeFormOption}
                                group_id="clip_separator"
                                group_name={options.clip_separator.group_name}
                                elements={options.clip_separator.elements}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default OptionsTab;
