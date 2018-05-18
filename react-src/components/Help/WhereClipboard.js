import React, { Component } from "react";
import { Panel } from "react-bootstrap";

class WhereClipboard extends Component {
    render() {
        return (
            <Panel className="khb-home-panel">
                <h4>What is "My Clippings.txt"?</h4>
                <p>
                    "My Clippings.txt" is a file on your Kindle that contains
                    your highlights and notes.
                </p>
                <h4>How do I find it?</h4>
                <ol>
                    <li>Plug your Kindle into your computer.</li>
                    <li>Click the Open button above.</li>
                    <li>Navigate to your Kindle.</li>
                    <li>Click the file named "My Clippings.txt".</li>
                    <li>Click Open.</li>
                </ol>
            </Panel>
        );
    }
}

export default WhereClipboard;
