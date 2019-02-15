import * as moment from "moment";

export type ClipKey = number;

export interface Clip {
    title: string;
    authorFullName: string;
    location: Location;
    location_start: number;
    date: moment.Moment;
    unix_timestamp: number;
    text: string;
}

export type Clippings = Map<ClipKey, Clip>;

export interface Location {
    type: string;
    value: string;
}
