import * as Types from "../types";
export default class PreviewGenerator {
    EOL: string;
    options: Types.ExportOptions;

    constructor(exportOptions: Types.ExportOptions, eol: string) {
        this.options = exportOptions;
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
                clipString += this.EOL;
            }

            clipString += this._titleBlock(
                title,
                clips[title][0]["authorFullName"]
            );

            bookBegin = true;
            clips[title].forEach(clip => {
                if (!bookBegin && clipString !== "") {
                    clipString += this._clipSeparator(clip);
                }

                clipString += this._locationTimeLine(clip);

                if (clip.highlight !== "") {
                    clipString += this._highlightBlock(clip);
                }

                if (clip.note !== "") {
                    clipString += this._noteBlock(clip);
                }
                bookBegin = false;
            });

            //clipString += `${this.EOL}`;
        });
        return clipString;
    }

    _titleBlock(title: string, authorFullName: string) {
        const dispOpts = this.options.display.elements;
        const surrOpts = this.options.surround_title_block.elements;

        if (
            dispOpts.should_display_book_title.value ||
            dispOpts.should_display_book_author.value
        ) {
            let clipString = `${surrOpts.text_before_title_block.value}${
                this.EOL
            }`;

            if (dispOpts.should_display_book_title) {
                clipString += `${title}${this.EOL}`;
            }
            if (dispOpts.should_display_book_author) {
                clipString += `By ${authorFullName}${this.EOL}`;
            }
            clipString += `${surrOpts.text_after_title_block.value}${this.EOL}`;

            return clipString;
        }
        return "";
    }

    _locationTimeLine(clip: Types.Clip) {
        const dispOpts = this.options.display.elements;
        const surrOpts = this.options.surround_location_block.elements;

        const includeLocation = dispOpts.should_display_quote_location.value;
        const includeDate = dispOpts.should_display_quote_date.value;

        if (includeLocation || includeDate) {
            let clipString = "";

            clipString += surrOpts.text_before_location_block.value;

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
                clipString += clip.date.format("MMMM DD, YYYY h:mm:ss a");
            }

            clipString += surrOpts.text_after_location_block.value;

            clipString += this._newlines(surrOpts.lines_after_location_block
                .value as string);

            return clipString;
        }
        return "";
    }

    _highlightBlock(clip: Types.Clip) {
        const surrOpts = this.options.surround_highlight.elements;
        let clipString = "";
        clipString += surrOpts.text_before_highlight.value;
        clipString += clip.highlight;
        clipString += surrOpts.text_after_highlight.value;

        clipString += this._newlines(surrOpts.lines_after_highlight
            .value as string);
        return clipString;
    }

    _noteBlock(clip: Types.Clip) {
        const surrOpts = this.options.surround_note.elements;
        let clipString = "";
        clipString += surrOpts.text_before_note.value;
        clipString += clip.note;
        clipString += surrOpts.text_after_note.value;

        clipString += this._newlines(surrOpts.lines_after_note.value as string);
        return clipString;
    }

    _clipSeparator(clip: Types.Clip) {
        const surrOpts = this.options.clip_separator.elements;
        let str = "";
        str += surrOpts.text_between_clips.value;
        str += this._newlines(surrOpts.lines_after_clip.value as string);
        return str;
    }

    _newlines(count: string) {
        let eolString = "";
        for (let i = 1; i <= parseInt(count as string); i++) {
            eolString += this.EOL;
        }
        return eolString;
    }
}
