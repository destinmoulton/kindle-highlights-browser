import React from "react";
import { render } from "react-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout.js";

import "./electron_menus/rightclick";

class Main {
    run() {
        const container = document.getElementById("react-app");

        const routing = (
            <BrowserRouter>
                <Route path="/" component={Layout}>
                    {" "}
                </Route>
            </BrowserRouter>
        );

        render(routing, container);
    }
}

var main = new Main();
main.run();
