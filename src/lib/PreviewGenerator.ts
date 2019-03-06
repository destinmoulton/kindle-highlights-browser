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
            let lastClip = "";
            clips[title].forEach(clip => {
                if (!bookBegin && clipString !== "" && lastClip !== "") {
                    clipString += this._clipSeparator(clip);
                }

                let clipBlock = this._locationTimeLine(clip);

                if (clip.highlight !== "") {
                    clipBlock += this._highlightBlock(clip);
                }

                if (clip.note !== "") {
                    clipBlock += this._noteBlock(clip);
                }

                clipString += clipBlock;
                lastClip = clipBlock;
                bookBegin = false;
            });
        });
        return clipString;
    }

    _titleBlock(title: string, authorFullName: string) {
        const opts = this.options.title.elements;

        if (
            opts.should_display_book_title.value ||
            opts.should_display_book_author.value
        ) {
            let tstr = opts.text_before_title_block.value;
            tstr += this.EOL;

            if (opts.should_display_book_title.value) {
                tstr += `${title}${this.EOL}`;
            }
            if (opts.should_display_book_author.value) {
                tstr += `By ${authorFullName}${this.EOL}`;
            }
            tstr += `${opts.text_after_title_block.value}${this.EOL}`;
            tstr += this._newlines(opts.lines_after_title_block
                .value as string);
            return tstr;
        }
        return "";
    }

    _locationTimeLine(clip: Types.Clip) {
        const opts = this.options.location.elements;

        const includeLocation = opts.should_display_quote_location.value;
        const includeDate = opts.should_display_quote_date.value;

        if (includeLocation || includeDate) {
            let lstr = "";

            lstr += opts.text_before_location_block.value;

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
                lstr += clip.date.format(opts.date_format.value as string);
            }

            lstr += opts.text_after_location_block.value;

            lstr += this._newlines(opts.lines_after_location_block
                .value as string);

            return lstr;
        }
        return "";
    }

    _highlightBlock(clip: Types.Clip) {
        const opts = this.options.highlights.elements;
        if (opts.should_display_highlights.value === true) {
            let hstr = opts.text_before_highlight.value;
            hstr += clip.highlight;
            hstr += opts.text_after_highlight.value.toString();

            hstr += this._newlines(opts.lines_after_highlight.value as string);
            return hstr;
        }
        return "";
    }

    _noteBlock(clip: Types.Clip) {
        const opts = this.options.notes.elements;
        if (opts.should_display_notes.value === true) {
            let nstr = opts.text_before_note.value;
            nstr += clip.note;
            nstr += opts.text_after_note.value.toString();

            nstr += this._newlines(opts.lines_after_note.value as string);
            return nstr;
        }
        return "";
    }

    _clipSeparator(clip: Types.Clip) {
        const opts = this.options.clip_separator.elements;
        let str = "";
        str += opts.text_between_clips.value;
        str += this._newlines(opts.lines_after_clip.value as string);
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
