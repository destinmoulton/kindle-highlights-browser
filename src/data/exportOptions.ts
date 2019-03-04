import * as Types from "../types";

const EOL_OPTIONS = [];
for (let i = 0; i <= 10; i++) {
    EOL_OPTIONS.push(i.toString());
}
const EXPORT_OPTIONS: Types.ExportOptions = {
    display: {
        group_id: "display",
        group_name: "Display",
        elements: {
            should_display_book_title: {
                id: "should_display_book_title",
                name: "Book Title",
                type: "checkbox",
                value: true
            },
            should_display_book_author: {
                id: "should_display_book_author",
                name: "Book Author",
                type: "checkbox",
                value: true
            },
            should_display_quote_location: {
                id: "should_display_quote_location",
                name: "Quote Location",
                type: "checkbox",
                value: true
            },
            should_display_quote_date: {
                id: "should_display_quote_date",
                name: "Quote Date",
                type: "checkbox",
                value: false
            }
        }
    },
    surround_title_block: {
        group_id: "surround_title_block",
        group_name: "Title Block",
        elements: {
            text_before_title_block: {
                id: "text_before_title_block",
                name: "Text Before Title/Author",
                type: "text",
                value: "===================="
            },
            text_after_title_block: {
                id: "text_after_title_block",
                name: "Text After Title/Author",
                type: "text",
                value: "===================="
            },
            lines_after_title_block: {
                id: "lines_after_title_block",
                name: "Lines After Title/Author",
                type: "select",
                options: EOL_OPTIONS,
                value: "1"
            }
        }
    },
    surround_location_block: {
        group_id: "surround_location_block",
        group_name: "Before and After",
        elements: {
            text_before_location_block: {
                id: "text_before_location_block",
                name: "Text Before Location/Date Block",
                type: "text",
                value: ""
            },
            text_after_location_block: {
                id: "text_after_location_block",
                name: "Text After Location/Date Block",
                type: "text",
                value: ""
            },
            lines_after_location_block: {
                id: "lines_after_location_block",
                name: "Lines After Location/Date Block",
                type: "select",
                options: EOL_OPTIONS,
                value: "1"
            }
        }
    },
    surround_highlight: {
        group_id: "surround_highlight",
        group_name: "Before and After Highlight",
        elements: {
            text_before_highlight: {
                id: "text_before_highlight",
                name: "Text Before Highlight",
                type: "text",
                value: ""
            },
            text_after_highlight: {
                id: "text_after_highlight",
                name: "Text After Highlight",
                type: "text",
                value: ""
            },
            lines_after_highlight: {
                id: "lines_after_highlight",
                name: "Lines After Highlight",
                type: "select",
                options: EOL_OPTIONS,
                value: "1"
            }
        }
    },
    surround_note: {
        group_id: "surround_note",
        group_name: "Before and After Note",
        elements: {
            text_before_note: {
                id: "text_before_note",
                name: "Text Before Note",
                type: "text",
                value: ""
            },
            text_after_note: {
                id: "text_after_note",
                name: "Text After Note",
                type: "text",
                value: ""
            },
            lines_after_note: {
                id: "lines_after_note",
                name: "Lines After Note",
                type: "select",
                options: EOL_OPTIONS,
                value: "1"
            }
        }
    },
    clip_separator: {
        group_id: "clip_separator",
        group_name: "Clip Separator",
        elements: {
            text_between_clips: {
                id: "text_between_clips",
                name: "Text Between Clip Blocks",
                type: "text",
                value: "---"
            },
            lines_after_clip: {
                id: "lines_after_clip",
                name: "Lines After Clip",
                type: "select",
                options: EOL_OPTIONS,
                value: "1"
            }
        }
    }
};

export default EXPORT_OPTIONS;
