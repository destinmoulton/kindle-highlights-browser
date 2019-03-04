import * as React from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Modal,
    Row,
    Tabs,
    Tab
} from "react-bootstrap";
import * as Types from "../../../../types";

interface Props {
    options: Types.ExportOptions;
    changeFormOption: (group_id: string, element_id: string, evt: any) => void;
}

function OptionsTab(props: Props) {
    return (
        <Row>
            <Col xs="6" />
            <Col xs="6" />
        </Row>
    );
}

export default OptionsTab;
