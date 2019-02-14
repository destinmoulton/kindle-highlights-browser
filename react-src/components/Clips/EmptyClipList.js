import React, { Component } from "react";

import Card from "react-bootstrap/Card";

export default () => {
    return (
        <div>
            <Card>
                <Card.Body>
                    <h4>
                        <i className="fa fa-search" />
                        &nbsp;Use the search box to find specific authors or
                        titles.
                    </h4>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <h4>
                        <i className="fa fa-arrow-left" />
                        &nbsp;Click on an Author or Title to start browsing.
                    </h4>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <h4>
                        <i className="fa fa-plus-square" />
                        &nbsp;Hold cmd (Mac) or Ctrl (Windows/Linux) to select
                        multiple authors or titles.
                    </h4>
                </Card.Body>
            </Card>
        </div>
    );
};
