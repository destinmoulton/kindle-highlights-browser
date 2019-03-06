import * as React from "react";

import { Card } from "react-bootstrap";

export default () => {
    return (
        <div>
            <div className="khb-clipslist-tip-box">
                <i className="fa fa-search" />
                &nbsp;&nbsp;Use the search box to find specific authors or
                titles.
            </div>
            <div className="khb-clipslist-tip-box">
                <i className="fa fa-arrow-left" />
                &nbsp;&nbsp;Click on an Author or Title to start browsing.
            </div>
            <div className="khb-clipslist-tip-box">
                <i className="fa fa-plus-square" />
                &nbsp;&nbsp;Hold cmd (Mac) or Ctrl (Windows/Linux) to select
                multiple authors or titles.
            </div>
        </div>
    );
};
