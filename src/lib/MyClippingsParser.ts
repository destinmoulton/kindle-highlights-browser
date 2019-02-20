import * as fs from "fs";

import * as moment from "moment";

import * as Types from "../types";

const CLIPPING_SEPARATOR = "==========";

const LOCATION_DATE_SEPARATOR = " | ";

const LOCATION_TYPES = [
    {
        name: "bookmark",
        prefix: "- Your Bookmark on Location "
    },
    {
        name: "highlight",
        prefix: "- Your Highlight on Location "
    },
    {
        name: "note",
        prefix: "- Your Note on Location "
    },
    {
        name: "highlight",
        prefix: "- Your Highlight on page ",
        shift: true,
        replacePrefix: "Location "
    }
];

const TIME_PREFIX = "Added on ";
const TITLEAUTHOR_SEPARATOR = " (";
const AUTHOR_SUFFIX = ")";
const AUTHOR_COMMA_SEPARATOR = ", ";
const AUTHOR_SPACE_SEPARATOR = ", ";
const MOMENT_FORMAT = "dddd, MMMM DD, YYYY h:mm:ss a";

export default class MyClippingsParser {
    authors: Set<string>;
    titles: Set<string>;

    constructor() {
        this.authors = new Set();
        this.titles = new Set();
    }

    parseFile(filename: string) {
        const contents = this.getFileContents(filename);
        const clips = contents.split(CLIPPING_SEPARATOR);

        let clippings: Types.ClippingsMap = new Map();
        let locationEndMap: Map<string, number> = new Map();
        let current_title = "";
        clips.map(clip => {
            let lines = clip.split(/\r?\n/);

            if (lines[0] === "") {
                lines = lines.slice(1);
            }

            if (lines[0] === "") {
                return;
            }

            const [title, authorFullName] = this.parseTitleAndAuthor(lines[0]);

            const {
                location,
                location_end,
                location_start,
                date,
                unix_timestamp
            } = this.parseLocationAndDate(lines[1]);

            if (!clippings.has(unix_timestamp)) {
                if (location.type !== "bookmark") {
                    if (!this.authors.has(authorFullName)) {
                        this.authors.add(authorFullName);
                    }
                    if (!this.titles.has(title)) {
                        this.titles.add(title);
                    }

                    const clipContent = lines[3];

                    const locationMapID =
                        location_end.toString() + title + authorFullName;

                    if (location.type === "note") {
                        if (locationEndMap.has(locationMapID)) {
                            // Notes can be associated with highlights
                            const clipKey = locationEndMap.get(locationMapID);
                            const clip = clippings.get(clipKey);
                            clip.note = clipContent;
                            clip.type = Types.ClipType.HighlightWithNote;
                            clippings.set(clipKey, clip);
                        } else {
                            // This note not associated with a highlight
                            clippings.set(unix_timestamp, {
                                title,
                                authorFullName,
                                location,
                                location_end,
                                location_start,
                                date,
                                unix_timestamp,
                                highlight: "",
                                note: clipContent,
                                type: Types.ClipType.Note
                            });
                        }
                    } else if (location.type === "highlight") {
                        locationEndMap.set(locationMapID, unix_timestamp);
                        clippings.set(unix_timestamp, {
                            title,
                            authorFullName,
                            location,
                            location_end,
                            location_start,
                            date,
                            unix_timestamp,
                            highlight: clipContent,
                            note: "",
                            type: Types.ClipType.Highlight
                        });
                    }
                }
            }
        });
        return clippings;
    }

    getAuthorsAsSortedArray(): string[] {
        const authorNames = Array.from(this.authors.values());

        return authorNames.sort();
    }

    getTitlesAsSortedArray(): string[] {
        const titles = Array.from(this.titles.values());
        return titles.sort();
    }

    parseTitleAndAuthor(str: string) {
        const parts = str.split(TITLEAUTHOR_SEPARATOR);

        const title = parts[0].trim();

        const authorFullName = this.determineAuthorName(parts[1]);

        return [title, authorFullName];
    }

    determineAuthorName(fullAuthorString: string) {
        let nameParts = fullAuthorString
            .replace(AUTHOR_SUFFIX, "")
            .split(AUTHOR_COMMA_SEPARATOR);

        let firstName = "";
        let lastName = "";
        let space = " ";
        if (nameParts.length > 1) {
            // Comma separated (last, first)
            lastName = nameParts[0];
            firstName = nameParts[1];
        } else {
            // Try space separated
            nameParts = nameParts[0].split(AUTHOR_SPACE_SEPARATOR);
            if (nameParts.length > 1) {
                // Is space separated (first last)
                firstName = nameParts[0];
                lastName = nameParts[1];
            } else if (nameParts.length === 1) {
                space = "";
                firstName = nameParts[0];
                lastName = "";
            } else {
                firstName = "Undefined";
                lastName = "Author";
            }
        }
        return firstName + space + lastName;
    }

    parseLocationAndDate(locationAndDate: string) {
        const parts = locationAndDate.split(LOCATION_DATE_SEPARATOR);
        let location: Types.Location = { type: "", value: "" };

        for (let i = 0; i < LOCATION_TYPES.length; i++) {
            const possibleType = LOCATION_TYPES[i];

            if (parts[0].startsWith(possibleType.prefix)) {
                if (possibleType.hasOwnProperty("shift")) {
                    parts.shift();
                }

                let replacePrefix = possibleType.prefix;
                if (possibleType.hasOwnProperty("replacePrefix")) {
                    replacePrefix = possibleType.replacePrefix;
                }

                location = {
                    type: possibleType.name,
                    value: parts[0].replace(replacePrefix, "")
                };
            }
        }
        const locationValues = location["value"].split("-");
        const location_start = parseInt(locationValues[0]);
        let location_end = location_start;
        if (locationValues.length > 1) {
            location_end = parseInt(locationValues[1]);
        }
        const dateStr = parts[1].replace(TIME_PREFIX, "");
        const date = moment(dateStr, MOMENT_FORMAT);

        const unix_timestamp = date.unix();
        return { location, location_end, location_start, date, unix_timestamp };
    }

    getFileContents(filename: string) {
        return fs.readFileSync(filename, "utf8");
    }
}
