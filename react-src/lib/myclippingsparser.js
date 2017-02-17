import fs from "fs";

import moment from "moment";

import AuthorType from "./AuthorType";

const CLIPPING_SEPARATOR = "==========";
const TITLEAUTHOR_SEPARATOR = " (";
const LOCATION_HIGHLIGHT_PREFIX = "- Your Highlight on Location ";
const LOCATION_PAGE_PREFIX = "- Your Highlight on page ";
const LOCATION_BOOKMARK_PREFIX = "- Your Bookmark on Location ";
const LOCATION_SHORT_PREFIX = "Location ";
const LOCATION_NOTE_PREFIX = "- Your Note on Location ";
const LOCTIME_SEPARATOR = " | ";
const TIME_PREFIX = "Added on ";
const AUTHOR_SUFFIX = ")";
const AUTHOR_COMMA_SEPARATOR = ", ";
const AUTHOR_SPACE_SEPARATOR = ", ";
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

            let author = "";
            if(titleAuthor['authorFirstName']!=""){
                author = titleAuthor['authorFirstName'] + " ";
            }

            author += titleAuthor['authorLastName'];
            if(!clippings.hasOwnProperty(titleAuthor['title'])){
                clippings[titleAuthor['title']] = {
                    title:titleAuthor['title'],
                    author:author,
                    clips:[]
                };

            }

            const locdate = this.parseLocationAndDate(lines[1]);
            clipData['location'] = locdate['location'];
            clipData['location_start'] = parseInt(locdate['location_start']);
            clipData['date'] = locdate['date'];
            clipData['unix_timestamp'] = locdate['unix_timestamp'];
            
            clipData['text'] = lines[3];

            if(clipData['location']['type']!=="bookmark"){
                clippings[titleAuthor['title']]['clips'].push(clipData);
            }

        });
        return clippings;
    }

    parseTitleAndAuthor(str){
        const parts = str.split(TITLEAUTHOR_SEPARATOR);

        const title = parts[0];

        let authorParts = parts[1].replace(AUTHOR_SUFFIX,"").split(AUTHOR_COMMA_SEPARATOR);

        let authorFirstName = "";
        let authorLastName = "";
        if(authorParts.length > 1){
            // Comma separated (last, first)
            authorLastName = authorParts[0];
            authorFirstName = authorParts[1];
        } else {
            // Try space separated
            authorParts = authorParts.split(AUTHOR_SPACE_SEPARATOR);
            if(authorParts.length > 1){
                // Is space separated (first last)
                authorFirstName = authorParts[0];
                authorLastName = authorParts[1];
            } else {
                authorFirstName = authorParts[0];
                authorLastName = "";
            }
        }

        const author = new Author(authorFirstName, authorLastName);

        return { title, author };
    }


    parseLocationAndDate(str){
        const parts = str.split(LOCTIME_SEPARATOR);
        let location = {};

        if(parts[0].startsWith(LOCATION_BOOKMARK_PREFIX)){
            location = {
                'type':'bookmark',
                'value':parts[0].replace(LOCATION_BOOKMARK_PREFIX, "")
            }
        } else if(parts[0].startsWith(LOCATION_HIGHLIGHT_PREFIX)){
            location = {
                'type':'highlight',
                'value':parts[0].replace(LOCATION_HIGHLIGHT_PREFIX, "")
            };
        } else if(parts[0].startsWith(LOCATION_NOTE_PREFIX)){
            location = {
                'type':'note',
                'value':parts[0].replace(LOCATION_NOTE_PREFIX, "")
            };
        } else if(parts[0].startsWith(LOCATION_PAGE_PREFIX)){
            // Ignore the Page (meaningless)
            parts.shift();

            location = {
                'type':'highlight',
                'value':parts[0].replace(LOCATION_SHORT_PREFIX, "")
            }
            
        }
        
        const location_start = location['value'].split('-')[0];
        const dateStr = parts[1].replace(TIME_PREFIX, "");
        const date = moment(dateStr, MOMENT_FORMAT);
        
        const unix_timestamp = date.unix();
        return { location, location_start, date, unix_timestamp };
    }

    getFileContents(filename){
        return fs.readFileSync(filename, 'utf8');
    }
}