import React from "react";

import { remote, ipcRenderer } from "electron";

import SettingStore from "../lib/SettingStore";

import Home from "./Home";

import HighlightBrowser from "./HighlightBrowser.js";

import MyClippingsParser from "../lib/MyClippingsParser";

const SETTING_LAST_OPEN_FILE = "last_open_myclippings_file";

const INITIAL_STATE = {
    hasClippings: false,
    clippings: {},
    authors: [],
    titles: []
};

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, INITIAL_STATE);

        // Local instance of the storage/db mechanism
        this.settingStore = new SettingStore();

        ipcRenderer.on("open-my-clippings", event => {
            this.openClippingsDialog();
        });

        ipcRenderer.on("close-my-clippings", event => {
            this.settingStore.delete(SETTING_LAST_OPEN_FILE);
            this.clearClippings();
        });
    }

    componentDidMount() {
        this.loadLastFileUsed();
    }

    clearClippings() {
        this.setState(Object.assign({}, INITIAL_STATE));
    }

    /**
     * Load the last file used from the DB.
     */
    loadLastFileUsed() {
        if (this.settingStore.has(SETTING_LAST_OPEN_FILE)) {
            this.parseFile(this.settingStore.get(SETTING_LAST_OPEN_FILE));
        }
    }

    /**
     * Set the last file used in a DB entry.
     *
     * @param String fileName
     */
    setLastFileUsed(fileName) {
        this.settingStore.set(SETTING_LAST_OPEN_FILE, fileName);
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

        return contents;
    }
}
