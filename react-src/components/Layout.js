import React from "react";

import { remote, ipcRenderer } from "electron";

import Storage from "../lib/Storage";

import Home from "./Home";

import HighlightBrowser from "./HighlightBrowser.js";

import MyClippingsParser from "../lib/MyClippingsParser";

const DB_LAST_SETTING_QUERY = { setting: "last_open_myclippings_file" };
export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasClippings: false,
            clippings: {}
        };

        // Local instance of the storage/db mechanism
        this.storage = new Storage();

        this.loadLastFileUsed();

        ipcRenderer.on("open-my-clippings", event => {
            this.openClippingsDialog();
        });
    }

    /**
     * Load the last file used from the DB.
     */
    loadLastFileUsed() {
        this.storage.find(DB_LAST_SETTING_QUERY, set => {
            this.parseFile(set[0].value);
        });
    }

    /**
     * Set the last file used in a DB entry.
     *
     * @param String fileName
     */
    setLastFileUsed(fileName) {
        this.storage.find(DB_LAST_SETTING_QUERY, set => {
            if (set.length === 0) {
                this.storage.insert({
                    setting: "last_open_myclippings_file",
                    value: fileName
                });
            } else {
                this.storage.update(DB_LAST_SETTING_QUERY, { value: fileName });
            }
        });
    }

    /**
     * Parse an opened file.
     * Get the clips, authors and titles and store
     * in local state.
     *
     * @param String fileName
     */
    parseFile(fileName) {
        const clipParser = new MyClippingsParser();
        const clippings = clipParser.parseFile(fileName);
        const authors = clipParser.getAuthorsAsSortedArray();
        const titles = clipParser.getTitlesAsSortedArray();

        this.setLastFileUsed(fileName);

        this.setState({
            hasClippings: true,
            clippings,
            authors,
            titles
        });
    }

    openClippingsDialog() {
        remote.dialog.showOpenDialog({ properties: ["openFile"] }, fileName => {
            this.parseFile(fileName[0]);
        });
    }

    render() {
        const { clippings, authors, titles } = this.state;

        let contents = (
            <Home
                openClippingsDialogHandler={this.openClippingsDialog.bind(this)}
            />
        );
        if (this.state.hasClippings) {
            contents = (
                <HighlightBrowser
                    clippings={clippings}
                    authors={authors}
                    titles={titles}
                />
            );
        }

        return <div>{contents}</div>;
    }
}
