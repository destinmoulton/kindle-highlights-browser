import React, { Component } from 'react';

import { Panel } from 'react-bootstrap';

class EmptyClipList extends Component {
    render() {
        return (
            <div>
                <Panel>
                    <h4><i className="fa fa-search"></i>&nbsp;Use the search box to find specific authors or titles.</h4>
                </Panel>
                <Panel>
                    <h4><i className="fa fa-arrow-left"></i>&nbsp;Click on an Author or Title to start browsing.</h4>
                </Panel>
                <Panel>
                    <h4><i className="fa fa-plus-square"></i>&nbsp;Hold cmd (Mac) or Ctrl (Windows/Linux) to select multiple authors or titles.</h4>
                </Panel>
            </div>
        );
    }
}

export default EmptyClipList;