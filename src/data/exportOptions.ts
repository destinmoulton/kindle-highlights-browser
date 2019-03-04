import * as Types from "../types";

const EOL_OPTIONS = [];
for (let i = 0; i <= 10; i++) {
    EOL_OPTIONS.push(i);
}
const EXPORT_OPTIONS: Types.ExportOptions = [
    {
        group_id: "display",
        group_name: "Display",
        elements: [
            {
                id: "should_display_book_title",
                name: "Book Title",
                type: "checkbox",
                default: true
            },
            {
                id: "should_display_book_author",
                name: "Book Author",
                type: "checkbox",
                default: true
            },
            {
                id: "should_display_quote_location",
                name: "Quote Location",
                type: "checkbox",
                default: true
            },
            {
                id: "should_display_quote_date",
                name: "Quote Date",
                type: "checkbox",
                default: false
            }
        ]
    },
    {
        group_id: "before_and_after_title_block",
        group_name: "Before and After Title Block",
        elements: [
            {
                id: "text_before_title_block",
                name: "Text Before Title/Author Block",
                type: "text",
                default: "===================="
            },
            {
                id: "text_after_title_block",
                name: "Text After Title/Author Block",
                type: "text",
                default: "===================="
            },
            {
                id: "lines_after_title_block",
                name: "Lines After Title/Author Block",
                type: "select",
                options: EOL_OPTIONS,
                default: 0
            }
        ]
    },
    {
        group_id: "before_and_after_quote_location_block",
        group_name: "Before and After",
        elements: [
            {
                id: "text_before_location_block",
                name: "Text Before Location/Date Block",
                type: "text",
                default: ""
            },
            {
                id: "text_after_location_block",
                name: "Text After Location/Date Block",
                type: "text",
                default: ""
            },
            {
                id: "lines_after_location_block",
                name: "Lines After Location/Date Block",
                type: "select",
                options: EOL_OPTIONS,
                default: 0
            }
        ]
    },
    {
        group_id: "before_and_after_highlight",
        group_name: "Before and After Highlight",
        elements: [
            {
                id: "text_before_highlight",
                name: "Text Before Highlight",
                type: "text",
                default: ""
            },
            {
                id: "text_after_highlight",
                name: "Text After Highlight",
                type: "text",
                default: ""
            },
            {
                id: "lines_after_highlight",
                name: "Lines After Highlight",
                type: "select",
                options: EOL_OPTIONS,
                default: 0
            }
        ]
    },
    {
        group_id: "before_and_after_note",
        group_name: "Before and After Note",
        elements: [
            {
                id: "text_before_note",
                name: "Text Before Note",
                type: "text",
                default: ""
            },
            {
                id: "text_after_note",
                name: "Text After Note",
                type: "text",
                default: ""
            },
            {
                id: "lines_after_note",
                name: "Lines After Note",
                type: "select",
                options: EOL_OPTIONS,
                default: 0
            }
        ]
    },
    {
        group_id: "clip_separator",
        group_name: "Clip Separator",
        elements: [
            {
                id: "text_between_clips",
                name: "Text Between Clip Blocks",
                type: "text",
                default: "---"
            },
            {
                id: "lines_after_clip",
                name: "Lines After Clip",
                type: "select",
                options: EOL_OPTIONS,
                default: 0
            }
        ]
    }
];

export default EXPORT_OPTIONS;
