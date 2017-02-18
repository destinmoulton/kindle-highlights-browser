
/**
 * Extract data from the clippings.
 */
export default class TreeExtractor {
    constructor(clippings){
        this.clippings = clippings;
    }

    getAuthors(){
        let foundAuthors = {};
        let clipsByAuthor = [];
        clippings.map(this.clippings, function(clip){
            if(!foundAuthors.hasOwnProperty(clip.author)){
                const tmp = {};
                tmp[clip.author]
                clipsByAuthor.push(tmp);
                foundAuthors[clip.author] = true;
            }
        });
        return clipsByAuthor;
    }
}