import React from "react";

import WhereAreMyClippings from "./Help/WhereAreMyClippings";

export default class Help extends React.Component {
    render() {
        let helpContents = [];

        return (
            <div>
                <WhereAreMyClippings />
            </div>
        );
    }
}
