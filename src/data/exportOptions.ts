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
                value: "====================",
                enabled_on:
                    "should_display_book_title||should_display_book_author"
            },
            text_after_title_block: {
                id: "text_after_title_block",
                name: "Text After Title/Author",
                type: "text",
                value: "====================",
                enabled_on:
                    "should_display_book_title||should_display_book_author"
            },
            lines_after_title_block: {
                id: "lines_after_title_block",
                name: "Lines After Title/Author",
                type: "select",
                options: EOL_OPTIONS,
                value: "1",
                enabled_on:
                    "should_display_book_title||should_display_book_author"
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
                value: "MMMM DD, YYYY h:mm:ss a",
                enabled_on: "should_display_quote_date"
            },
            text_before_location_block: {
                id: "text_before_location_block",
                name: "Text Before Location/Date Block",
                type: "text",
                value: "",
                enabled_on:
                    "should_display_quote_location||should_display_quote_date"
            },
            text_after_location_block: {
                id: "text_after_location_block",
                name: "Text After Location/Date Block",
                type: "text",
                value: "",
                enabled_on:
                    "should_display_quote_location||should_display_quote_date"
            },
            lines_after_location_block: {
                id: "lines_after_location_block",
                name: "Lines After Location/Date Block",
                type: "select",
                options: EOL_OPTIONS,
                value: "1",
                enabled_on:
                    "should_display_quote_location||should_display_quote_date"
            }
        }
    },
    highlights: {
        group_id: "highlights",
        group_name: "Highlight Options",
        elements: {
            should_display_highlights: {
                id: "should_display_highlights",
                name: "Display Highlights",
                type: "checkbox",
                value: true
            },
            text_before_highlight: {
                id: "text_before_highlight",
                name: "Text Before Each Highlight",
                type: "text",
                value: "",
                enabled_on: "should_display_highlights"
            },
            text_after_highlight: {
                id: "text_after_highlight",
                name: "Text After Each Highlight",
                type: "text",
                value: "",
                enabled_on: "should_display_highlights"
            },
            lines_after_highlight: {
                id: "lines_after_highlight",
                name: "Lines After Each Highlight",
                type: "select",
                options: EOL_OPTIONS,
                value: "1",
                enabled_on: "should_display_highlights"
            }
        }
    },
    notes: {
        group_id: "notes",
        group_name: "Note Options",
        elements: {
            should_display_notes: {
                id: "should_display_notes",
                name: "Display Notes",
                type: "checkbox",
                value: true
            },
            text_before_note: {
                id: "text_before_note",
                name: "Text Before Each Note",
                type: "text",
                value: "",
                enabled_on: "should_display_notes"
            },
            text_after_note: {
                id: "text_after_note",
                name: "Text After Each Note",
                type: "text",
                value: "",
                enabled_on: "should_display_notes"
            },
            lines_after_note: {
                id: "lines_after_note",
                name: "Lines After Each Note",
                type: "select",
                options: EOL_OPTIONS,
                value: "1",
                enabled_on: "should_display_notes"
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
