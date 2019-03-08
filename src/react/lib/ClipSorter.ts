import * as Types from "../types";

export default class ClipSorter {
    fieldToSort: string;
    constructor() {
        this.fieldToSort = "";
    }

    /**
     * Sort an array of clips by a property (field)
     * of the clip.
     *
     * @param clips Array of clip objects
     * @param sortBy String containing field|dir (where dir is either asc/desc)
     */
    sortClips(clips: Types.Clip[], sortBy: string) {
        const sortParts = sortBy.split("|");
        this.fieldToSort = sortParts[0];
        if (sortParts[1] === "asc") {
            clips.sort(this._compareFieldAsc.bind(this));
        } else {
            clips.sort(this._compareFieldDesc.bind(this));
        }
    }

    _compareFieldAsc(x: any, y: any) {
        if (x[this.fieldToSort] < y[this.fieldToSort]) {
            return -1;
        }
        if (x[this.fieldToSort] > y[this.fieldToSort]) {
            return 1;
        }
        return 0;
    }

    _compareFieldDesc(x: any, y: any) {
        if (x[this.fieldToSort] > y[this.fieldToSort]) {
            return -1;
        }
        if (x[this.fieldToSort] < y[this.fieldToSort]) {
            return 1;
        }
        return 0;
    }
}
