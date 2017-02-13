import React, { Component } from 'react';

import { Panel } from 'react-bootstrap';

class EmptyClipList extends Component {
    render() {
        return (
            <Panel>
                <h4><i className="fa fa-arrow-left"></i>&nbsp;Click on an ebook to start browsing!</h4>
            </Panel>
        );
    }
}

export default EmptyClipList;