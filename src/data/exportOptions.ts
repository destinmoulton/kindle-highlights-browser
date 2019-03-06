import * as Types from "../types";

const EOL_OPTIONS = [];
for (let i = 0; i <= 10; i++) {
    EOL_OPTIONS.push(i.toString());
}
const EXPORT_OPTIONS: Types.ExportOptions = {
    title: {
        group_id: "title",
        group_name: "Title Options",
        elements: {
            should_display_book_title: {
                id: "should_display_book_title",
                name: "Display Book Title",
                type: "checkbox",
                value: true
            },
            should_display_book_author: {
                id: "should_display_book_author",
                name: "Display Book Author",
                type: "checkbox",
                value: true
            },
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
    location: {
        group_id: "location",
        group_name: "Location/Date Options",
        elements: {
            should_display_quote_location: {
                id: "should_display_quote_location",
                name: "Display Clip Location",
                type: "checkbox",
                value: true
            },
            should_display_quote_date: {
                id: "should_display_quote_date",
                name: "Display Clip Date",
                type: "checkbox",
                value: false
            },
            date_format: {
                id: "date_format",
                name: "Date Format",
                type: "text",
                value: "MMMM DD, YYYY h:mm:ss a"
            },
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
    highlights: {
        group_id: "highlights",
        group_name: "Highlight Options",
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
    notes: {
        group_id: "notes",
        group_name: "Note Options",
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
        group_name: "Clip Separator Options",
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
