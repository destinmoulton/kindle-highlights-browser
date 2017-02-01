import fs from "fs";

import moment from "moment";

const CLIPPING_SEPARATOR = "==========";
const TITLEAUTHOR_SEPARATOR = " (";
const LOCATION_LOC_PREFIX = "- Your Highlight on Location ";
const LOCATION_PAGE_PREFIX = "- Your Highlight on page ";
const LOCATION_BOOKMARK_PREFIX = "- Your Bookmark on Location ";
const LOCTIME_SEPARATOR = " | ";
const TIME_PREFIX = "Added on ";
const AUTHOR_SUFFIX = ")";
const AUTHOR_SEPARATOR = ", ";
const MOMENT_FORMAT = "dddd, MMMM DD, YYYY h:mm:ss a";

export default class MyClippingsParser {

    parseFile(filename){
        const contents = this.getFileContents(filename);

        //const lines = contents.split(/\r?\n/);
        const clips = contents.split(CLIPPING_SEPARATOR);

        let clippings = {};
        let current_title = "";
        clips.map((clip)=>{
            let lines = clip.split(/\r?\n/);
            
            if(lines[0]===""){
                lines = lines.slice(1);
            }

            if(lines[0]===""){
                return;
            }
            
            let clipData = {};

            const titleAuthor = this.parseTitleAndAuthor(lines[0]);
            if(!clippings.hasOwnProperty(titleAuthor['title'])){
                clippings[titleAuthor['title']] = {
                    title:titleAuthor['title'],
                    authorFirstName:titleAuthor['authorFirstName'],
                    authorLastName:titleAuthor['authorLastName'],
                    clips:[]
                };

            }

            const locdate = this.parseLocationAndDate(lines[1]);
            clipData['location'] = locdate['location'];
            clipData['date'] = locdate['date'];
            clipData['text'] = lines.slice(2);

            if(clipData['location']['type']!=="bookmark"){
                clippings[titleAuthor['title']]['clips'].push(clipData);
            }

        });
        return clippings;
    }

    parseTitleAndAuthor(str){
        const parts = str.split(TITLEAUTHOR_SEPARATOR);

        const title = parts[0];

        const authorParts = parts[1].replace(AUTHOR_SUFFIX,"").split(AUTHOR_SEPARATOR);
        const authorLastName = authorParts[0];
        const authorFirstName = authorParts[1];

        return { title, authorFirstName, authorLastName };
    }


    parseLocationAndDate(str){
        const parts = str.split(LOCTIME_SEPARATOR);
        let location = {};

        if(parts[0].startsWith(LOCATION_BOOKMARK_PREFIX)){
            location = {
                'type':'bookmark',
                'value':parts[0].replace(LOCATION_BOOKMARK_PREFIX, "")
            }
        } else if(parts[0].startsWith(LOCATION_LOC_PREFIX)){
            location = {
                'type':'location',
                'value':parts[0].replace(LOCATION_LOC_PREFIX, "")
            };
        } else {
            location = {
                'type':'page',
                'value':parts[0].replace(LOCATION_PAGE_PREFIX, "")
            }
        }
        const dateStr = parts[1].replace(TIME_PREFIX, "");
        const date = moment(dateStr, MOMENT_FORMAT);
        return { location, date };
    }

    getFileContents(filename){
        return fs.readFileSync(filename, 'utf8');
    }
}