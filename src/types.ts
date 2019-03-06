import * as moment from "moment";

export type ClipKey = number;

export enum ClipType {
    Note,
    Highlight,
    HighlightWithNote
}

export interface Clip {
    [key: string]: string | Location | number | moment.Moment;
    title: string;
    authorFullName: string;
    location: Location;
    location_end: number;
    location_start: number;
    date: moment.Moment;
    unix_timestamp: number;
    highlight: string;
    note: string;
    type: ClipType;
}

export type ClippingsMap = Map<ClipKey, Clip>;

export interface FilteredClips {
    [key: string]: Clip[];
}

export interface Location {
    type: string;
    value: string;
}

export type Authors = string[];
export type Titles = string[];

export interface Filter {
    fieldName: string;
    cleanContent: string;
    dirtyContent: string;
}

export type Filters = Filter[];

export interface ExportOptionFormElement {
    id: string;
    name: string;
    type: string;
    value: boolean | string;
    placeholder?: string;
    options?: string[];
    enabled_on?: string;
}

export interface ExportOptionFormElements {
    [key: string]: ExportOptionFormElement;
}

export interface ExportOptionGroup {
    group_id: string;
    group_name: string;
    elements: ExportOptionFormElements;
}

export interface ExportOptions {
    [key: string]: ExportOptionGroup;
}

export interface CSVColumn {
    key: string;
    name: string;
}
