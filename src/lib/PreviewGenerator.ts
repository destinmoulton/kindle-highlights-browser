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
            let tstr = surrOpts.text_before_title_block.value;
            tstr += this.EOL;

            if (dispOpts.should_display_book_title.value) {
                tstr += `${title}${this.EOL}`;
            }
            if (dispOpts.should_display_book_author.value) {
                tstr += `By ${authorFullName}${this.EOL}`;
            }
            tstr += `${surrOpts.text_after_title_block.value}${this.EOL}`;
            tstr += this._newlines(surrOpts.lines_after_title_block
                .value as string);
            return tstr;
        }
        return "";
    }

    _locationTimeLine(clip: Types.Clip) {
        const dispOpts = this.options.display.elements;
        const surrOpts = this.options.surround_location_block.elements;

        const includeLocation = dispOpts.should_display_quote_location.value;
        const includeDate = dispOpts.should_display_quote_date.value;

        if (includeLocation || includeDate) {
            let lstr = "";

            lstr += surrOpts.text_before_location_block.value;

            if (includeLocation) {
                if (clip.type === Types.ClipType.Highlight) {
                    lstr += "Highlight at ";
                } else if (clip.type === Types.ClipType.Note) {
                    lstr += "Note at ";
                } else if (clip.type === Types.ClipType.HighlightWithNote) {
                    lstr += "Highlight with Note at ";
                }

                lstr += `Location: ${clip.location.value}`;
            }

            if (includeLocation && includeDate) {
                lstr += " -- ";
            }

            if (includeDate) {
                lstr += clip.date.format("MMMM DD, YYYY h:mm:ss a");
            }

            lstr += surrOpts.text_after_location_block.value;

            lstr += this._newlines(surrOpts.lines_after_location_block
                .value as string);

            return lstr;
        }
        return "";
    }

    _highlightBlock(clip: Types.Clip) {
        const surrOpts = this.options.surround_highlight.elements;
        let hstr = surrOpts.text_before_highlight.value;
        hstr += clip.highlight;
        hstr += surrOpts.text_after_highlight.value.toString();

        hstr += this._newlines(surrOpts.lines_after_highlight.value as string);
        return hstr;
    }

    _noteBlock(clip: Types.Clip) {
        const surrOpts = this.options.surround_note.elements;
        let nstr = surrOpts.text_before_note.value;
        nstr += clip.note;
        nstr += surrOpts.text_after_note.value.toString();

        nstr += this._newlines(surrOpts.lines_after_note.value as string);
        return nstr;
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
