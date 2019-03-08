import * as React from "react";

import { remote, ipcRenderer } from "electron";

import SettingStore from "../lib/SettingStore";

import Home from "./Home";

import HighlightBrowser from "./HighlightBrowser";

import MyClippingsParser from "../lib/MyClippingsParser";
import * as Types from "../types";

const SETTING_LAST_OPEN_FILE = "last_open_myclippings_file";

const INITIAL_STATE: IState = {
    hasClippings: false,
    clippingsMap: new Map(),
    authors: [],
    titles: []
};

interface IProps {}
interface IState {
    clippingsMap: Types.ClippingsMap;
    hasClippings: boolean;
    authors: Types.Authors;
    titles: Types.Titles;
}

export default class Layout extends React.Component<IProps, IState> {
    settingStore: SettingStore;
    constructor(props: IProps) {
        super(props);

        this.state = Object.assign({}, INITIAL_STATE);

        // Local instance of the storage/db mechanism
        this.settingStore = new SettingStore();

        ipcRenderer.on("open-my-clippings", (e: any) => {
            this.openClippingsDialog();
        });

        ipcRenderer.on("close-my-clippings", (e: any) => {
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
    setLastFileUsed(fileName: string) {
        this.settingStore.set(SETTING_LAST_OPEN_FILE, fileName);
    }

    /**
     * Parse an opened file.
     * Get the clips, authors and titles and store
     * in local state.
     *
     * @param String fileName
     */
    parseFile(fileName: string) {
        const clipParser = new MyClippingsParser();
        const clippingsMap = clipParser.parseFile(fileName);
        const authors = clipParser.getAuthorsAsSortedArray();
        const titles = clipParser.getTitlesAsSortedArray();

        this.setLastFileUsed(fileName);

        this.setState({
            hasClippings: true,
            clippingsMap,
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
        const { clippingsMap, authors, titles } = this.state;

        let contents = (
            <Home
                openClippingsDialogHandler={this.openClippingsDialog.bind(this)}
            />
        );
        if (this.state.hasClippings) {
            contents = (
                <HighlightBrowser
                    clippingsMap={clippingsMap}
                    authors={authors}
                    titles={titles}
                />
            );
        }

        return contents;
    }
}
