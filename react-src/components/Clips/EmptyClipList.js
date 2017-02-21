import React, { Component } from 'react';

import { Panel } from 'react-bootstrap';

class EmptyClipList extends Component {
    render() {
        return (
            <div>
                <Panel>
                    <h4><i className="fa fa-arrow-left"></i>&nbsp;Click on an ebook to start browsing!</h4>
                </Panel>
                <Panel>
                    <h4><i className="fa fa-arrow-left"></i>&nbsp;Hold cmd (Mac) or Ctrl (Windows/Linux) to select multiple.</h4>
                </Panel>
            </div>
        );
    }
}

export default EmptyClipList;