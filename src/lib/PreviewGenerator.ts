import * as Types from "../types";
export default class PreviewGenerator {
    EOL: string;
    checkboxes: Types.ExportCheckboxes;
    radios: Types.ExportRadios;
    separators: Types.ExportSeparators;
    prefsuf: Types.ExportPrefixSuffixElements;

    constructor(exportOptions: Types.ExportOptions, eol: string) {
        const {
            checkboxes,
            radios,
            separators,
            prefixsuffixes
        } = exportOptions;
        this.checkboxes = checkboxes;
        this.radios = radios;
        this.separators = separators;
        this.prefsuf = prefixsuffixes;
        this.EOL = eol;
    }

    /**
     * Generate the formatted export string.
     *  The export options are set in the modal export popover.
     */
    generate(clips: Types.FilteredClips) {
        let clipString = "";
        let titles = Object.keys(clips);
        let bookBegin = true;
        titles.forEach(title => {
            if (!bookBegin) {
                // Extra newline before the next book
                clipString += `${this.EOL}`;
            }

            clipString += this._titleBlock(
                title,
                clips[title][0]["authorFullName"]
            );

            bookBegin = true;
            clips[title].forEach(clip => {
                if (!bookBegin && clipString !== "") {
                    if (this.radios.clip_separator === "text") {
                        clipString += `${this.EOL}${this.separators.clip}${
                            this.EOL
                        }`;
                    } else if (this.radios.clip_separator === "line") {
                        clipString += `${this.EOL}${this.EOL}`;
                    } else {
                        clipString += `${this.EOL}`;
                    }
                }

                clipString += this._locationTimeLine(clip);

                if (clip.highlight !== "") {
                    clipString += `${this.prefsuf.highlight.prefixValue}${
                        clip.highlight
                    }${this.prefsuf.highlight.suffixValue}`;
                }

                if (clip.note !== "") {
                    clipString += `${this.EOL}${this.EOL}`;
                    clipString += this.prefsuf.note.prefixValue;
                    clipString += clip.note;
                    clipString += this.prefsuf.note.suffixValue;
                    clipString += `${this.EOL}`;
                }
                bookBegin = false;
            });

            clipString += `${this.EOL}`;
        });
        return clipString;
    }

    _titleBlock(title: string, authorFullName: string) {
        let clipString = `${this.separators.title}${this.EOL}`;
        clipString += `${title}${this.EOL}`;
        clipString += `By ${authorFullName}${this.EOL}`;
        clipString += `${this.separators.title}${this.EOL}`;
        return clipString;
    }

    _locationTimeLine(clip: Types.Clip) {
        const includeLocation = this.checkboxes.location;
        const includeDate = this.checkboxes.date;
        let clipString = "";

        if (includeLocation || includeDate) {
            clipString += this.prefsuf.location.prefixValue;
        }

        if (includeLocation) {
            if (clip.type === Types.ClipType.Highlight) {
                clipString += "Highlight at ";
            } else if (clip.type === Types.ClipType.Note) {
                clipString += "Note at ";
            } else if (clip.type === Types.ClipType.HighlightWithNote) {
                clipString += "Highlight with Note at ";
            }

            clipString += `Location: ${clip.location.value}`;
        }

        if (includeLocation && includeDate) {
            clipString += " -- ";
        }

        if (includeDate) {
            clipString += `${clip.date.format("MMMM DD, YYYY h:mm:ss a")}`;
        }

        if (includeLocation || includeDate) {
            clipString += this.prefsuf.location.suffixValue;
            clipString += `${this.EOL}`;
        }
        return clipString;
    }
}
