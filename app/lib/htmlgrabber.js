import fs from "fs";
import path from "path";

const STATIC_HTML_DIR = "app/static_html";
const EXT = ".html";
export default function HTMLGrabber(dir, fileName){
    const pathToHTML = path.resolve('./', STATIC_HTML_DIR, dir, fileName+EXT);
    const contents = fs.readFileSync(pathToHTML, 'utf8');

    return contents;
}