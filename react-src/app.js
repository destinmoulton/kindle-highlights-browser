import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout.js';

import "./electron_menus/rightclick";

class Main {
    run(){
        const container = document.getElementById('react-app');

        const routing = (
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                </Route>
            </Router>
        );

        render(routing, container);
    }
}

var main = new Main();
main.run();
