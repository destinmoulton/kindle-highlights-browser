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

export interface ExportCheckboxes {
    [key: string]: boolean;
    location: boolean;
    date: boolean;
}

export interface ExportSeparators {
    [key: string]: string;
    title: string;
    clip: string;
}

export interface ExportRadios {
    [key: string]: string;
    clip_separator: string;
}

export interface ExportPrefixSuffixElement {
    [key: string]: string;
    prefixValue: string;
    suffixValue: string;
}

export interface ExportPrefixSuffixElements {
    [key: string]: ExportPrefixSuffixElement;
}

export interface ExportOptions {
    checkboxes: ExportCheckboxes;
    separators: ExportSeparators;
    radios: ExportRadios;
    prefixsuffixes: ExportPrefixSuffixElements;
}

export interface CSVColumn {
    key: string;
    name: string;
}
