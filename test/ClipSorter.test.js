import ClipSorter from '../react-src/lib/ClipSorter';

describe("ClipSorter", ()=>{
    const CLIPS_ORIGINAL = [
        {
            location_start: 10
        },
        {
            location_start: 5
        },
        {
            location_start: 3
        },
        {
            location_start: 15
        }
    ]; 

    test("sortClips ascending", ()=>{
        const FILTER = "location_start|asc";
        const EXPECTED_ASC = [
            {
                location_start: 3
            },
            {
                location_start: 5
            },
            {
                location_start: 10
            },
            {
                location_start: 15
            }
        ];

        let clipsToSort = [...CLIPS_ORIGINAL];
        const clipSorter = new ClipSorter();
        clipSorter.sortClips(clipsToSort, FILTER);
        expect(clipsToSort).toEqual(EXPECTED_ASC);
    });

    test("sortClips descending", ()=>{
        const FILTER = "location_start|desc";
        const EXPECTED_DESC = [
            {
                location_start: 15
            },
            {
                location_start: 10
            },
            {
                location_start: 5
            },
            {
                location_start: 3
            }
        ];

        let clipsToSort = [...CLIPS_ORIGINAL];
        const clipSorter = new ClipSorter();
        clipSorter.sortClips(clipsToSort, FILTER);
        expect(clipsToSort).toEqual(EXPECTED_DESC);
    });
});