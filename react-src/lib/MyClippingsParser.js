import fs from "fs";

import moment from "moment";

const CLIPPING_SEPARATOR = "==========";
const TITLEAUTHOR_SEPARATOR = " (";
const LOCATION_DATE_SEPARATOR = " | ";

const LOCATION_TYPES = [
    {
        name: "bookmark",
        prefix: "- Your Bookmark on Location "
    },
    {
        name: "highlight",
        prefix: "- Your Highlight on Location "
    },
    {
        name: "note",
        prefix: "- Your Note on Location "
    },
    {
        name: "highlight",
        prefix: "- Your Highlight on page ",
        shift: true,
        replacePrefix: "Location "
    }
];

const TIME_PREFIX = "Added on ";
const AUTHOR_SUFFIX = ")";
const AUTHOR_COMMA_SEPARATOR = ", ";
const AUTHOR_SPACE_SEPARATOR = ", ";
const MOMENT_FORMAT = "dddd, MMMM DD, YYYY h:mm:ss a";

export default class MyClippingsParser {

    constructor(){
        this.authors = {};
        this.titles = {};
    }

    parseFile(filename){
        const contents = this.getFileContents(filename);
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

            const {title, authorFullName} = this.parseTitleAndAuthor(lines[0]);

            let clipData = {};
            const { location, location_start, date, unix_timestamp } = this.parseLocationAndDate(lines[1]);
            
            if(!clippings.hasOwnProperty(unix_timestamp)){
                if(location.type !== "bookmark"){
                    if (!this.authors.hasOwnProperty(authorFullName)) {
                        this.authors[authorFullName] = authorFullName;
                    }
                    if (!this.titles.hasOwnProperty(title)) {
                        this.titles[title] = title;
                    }

                    clippings[unix_timestamp] = {
                        title,
                        authorFullName,
                        location,
                        location_start,
                        date,
                        unix_timestamp,
                        text:lines[3]
                    };
                }
            }
        });
        return clippings;
    }

    getAuthorsAsSortedArray(){
        const authorNames = Object.keys(this.authors);

        return authorNames.sort();
    }

    getTitlesAsSortedArray(){
        const titles = Object.keys(this.titles);
        return titles.sort();
    }

    parseTitleAndAuthor(str){
        const parts = str.split(TITLEAUTHOR_SEPARATOR);

        const title = parts[0].trim();

        const authorFullName = this.determineAuthorName(parts[1]);

        return { title, authorFullName };
    }

    determineAuthorName(fullAuthorString){
        let nameParts = fullAuthorString.replace(AUTHOR_SUFFIX,"").split(AUTHOR_COMMA_SEPARATOR);

        let firstName = "";
        let lastName = "";
        let space = " ";
        if(nameParts.length > 1){
            // Comma separated (last, first)
            lastName = nameParts[0];
            firstName = nameParts[1];
        } else {
            // Try space separated
            nameParts = nameParts[0].split(AUTHOR_SPACE_SEPARATOR);
            if(nameParts.length > 1){
                // Is space separated (first last)
                firstName = nameParts[0];
                lastName = nameParts[1];
            } else if(nameParts.length === 1){
                space = "";
                firstName = nameParts[0];
                lastName = "";
            } else {
                firstName = "Undefined"
                lastName = "Author";
            }
        }
        return firstName + space + lastName;
    }

    parseLocationAndDate(locationAndDate){
        const parts = locationAndDate.split(LOCATION_DATE_SEPARATOR);
        let location = {};

        for(let i=0; i<LOCATION_TYPES.length; i++){
            const possibleType = LOCATION_TYPES[i];

            if (parts[0].startsWith(possibleType.prefix)) {
                if(possibleType.hasOwnProperty('shift')){
                    parts.shift();
                }

                let replacePrefix = possibleType.prefix;
                if(possibleType.hasOwnProperty('replacePrefix')){
                    replacePrefix = possibleType.replacePrefix;
                }

                location = {
                    'type': possibleType.name,
                    'value': parts[0].replace(replacePrefix, "")
                }
            }   
        }
        
        const location_start = parseInt(location['value'].split('-')[0]);
        const dateStr = parts[1].replace(TIME_PREFIX, "");
        const date = moment(dateStr, MOMENT_FORMAT);
        
        const unix_timestamp = date.unix();
        return { location, location_start, date, unix_timestamp };
    }

    getFileContents(filename){
        return fs.readFileSync(filename, 'utf8');
    }
}