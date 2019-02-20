import * as Types from "../types";
export default class PreviewGenerator {
    EOL: string;
    checkboxes: Types.ExportCheckboxes;
    radios: Types.ExportRadios;
    separators: Types.ExportSeparators;

    constructor(exportOptions: Types.ExportOptions, eol: string) {
        const { checkboxes, radios, separators } = exportOptions;
        this.checkboxes = checkboxes;
        this.radios = radios;
        this.separators = separators;
        this.EOL = eol;
    }

    /**
     * Generate the formatted export string.
     *  The export options are set in the modal export popover.
     */
    generate(clips: Types.FilteredClips) {
        let quotationMark = this.checkboxes.quote ? '"' : "";

        let clipsString = "";
        let titles = Object.keys(clips);
        let bookBegin = true;
        titles.forEach(title => {
            if (!bookBegin) {
                // Extra newline before the next book
                clipsString += `${this.EOL}`;
            }

            clipsString += this._titleBlock(
                title,
                clips[title][0]["authorFullName"]
            );

            bookBegin = true;
            clips[title].forEach(clip => {
                if (!bookBegin && clipsString !== "") {
                    if (this.radios.clip_separator === "text") {
                        clipsString += `${this.EOL}${this.separators.clip}${
                            this.EOL
                        }`;
                    } else if (this.radios.clip_separator === "line") {
                        clipsString += `${this.EOL}${this.EOL}`;
                    } else {
                        clipsString += `${this.EOL}`;
                    }
                }

                clipsString += this._locationTimeLine(clip);

                if (clip.highlight !== "") {
                    clipsString += `> ${quotationMark}${
                        clip.highlight
                    }${quotationMark}`;
                }

                if (clip.note !== "") {
                    clipsString += `${this.EOL}`;
                    clipsString += "`" + clip.note + "`";
                    clipsString += `${this.EOL}`;
                }
                bookBegin = false;
            });

            clipsString += `${this.EOL}`;
        });
        return clipsString;
    }

    _titleBlock(title: string, authorFullName: string) {
        let clipsString = `${this.separators.title}${this.EOL}`;
        clipsString += `${title}${this.EOL}`;
        clipsString += `By ${authorFullName}${this.EOL}`;
        clipsString += `${this.separators.title}${this.EOL}`;
        return clipsString;
    }

    _locationTimeLine(clip: Types.Clip) {
        const includeLocation = this.checkboxes.location;
        const includeDate = this.checkboxes.date;
        let clipsString = "";

        if (includeLocation || includeDate) {
            clipsString += "_"; // italics
        }

        if (includeLocation) {
            if (clip.type === Types.ClipType.Highlight) {
                clipsString += "Highlight at ";
            } else if (clip.type === Types.ClipType.Note) {
                clipsString += "Note at ";
            } else if (clip.type === Types.ClipType.HighlightWithNote) {
                clipsString += "Highlight with Note at ";
            }

            clipsString += `Location: ${clip.location.value}`;
        }

        if (includeLocation && includeDate) {
            clipsString += " -- ";
        }

        if (includeDate) {
            clipsString += `${clip.date.format("MMMM DD, YYYY h:mm:ss a")}`;
        }
        if (includeLocation || includeDate) {
            clipsString += "_"; // italics
        }

        if (includeLocation || includeDate) {
            clipsString += `${this.EOL}`;
        }
        return clipsString;
    }
}
