import React, {Component} from 'react';

import {Panel} from "react-bootstrap";

class HelpSection extends Component {
    render() {
        const {htmlContent} = this.props;
        return (
            <Panel>
            <div dangerouslySetInnerHTML={{__html:htmlContent}}/>
            </Panel>
        );
    }
}

export default HelpSection;