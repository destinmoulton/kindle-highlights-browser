import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as Types from "../../../../types";
import OptionFormGenerator from "./OptionFormGenerator";

interface Props {
    options: Types.ExportOptions;
    changeFormOption: (group_id: string, element_id: string, evt: any) => void;
}

function OptionsTab(props: Props) {
    const { options, changeFormOption } = props;
    return (
        <Row>
            <Col xs="6">
                <OptionFormGenerator
                    changeElement={changeFormOption}
                    group_id="display"
                    group_name={options.display.group_name}
                    elements={options.display.elements}
                />
                <OptionFormGenerator
                    changeElement={changeFormOption}
                    group_id="surround_title_block"
                    group_name={options.surround_title_block.group_name}
                    elements={options.surround_title_block.elements}
                />
            </Col>
            <Col xs="6" />
        </Row>
    );
}

export default OptionsTab;
