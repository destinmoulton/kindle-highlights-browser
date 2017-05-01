
/**
 * Generate the string for a clip to export
 */
export function GenerateClipsString(clips, checkboxes, separators, EOL){
    const includeLocation = checkboxes.location;
    const includeDate = checkboxes.date;
    let clipsString = "";
    let titles = Object.keys(clips);
    
    titles.forEach((title)=>{

        let bookBegin = true;
        clipsString += `${EOL}${separators.title}${EOL}`;
        clipsString += `${title}${EOL}`;
        clipsString += `By ${clips[title][0]['authorFullName']}${EOL}`;
        clipsString += `${separators.title}${EOL}`;
        
        clips[title].forEach((clip)=>{
            
            let quote = "";
            if (!bookBegin && clipsString !== "") {
                clipsString += `${EOL}${separators.clip}${EOL}`;
            }

            if (includeLocation) {
                if (clip.location.type === 'highlight') {
                    clipsString += "Highlight at ";
                    quote = `"`;
                } else if (clip.location.type === 'note') {
                    clipsString += "Note at ";
                }

                clipsString += `Location: ${clip.location.value}`;
            }

            if (includeLocation && includeDate) {
                clipsString += " -- ";
            }

            if (includeDate) {
                clipsString += `${clip.date.format("MMMM DD, YYYY h:mm:ss a")}`;
            }

            if (includeLocation || includeDate) {
                clipsString += `${EOL}`;
            }

            clipsString += `${quote}${clip.text}${quote}`;
            bookBegin = false;
        });

        if(separators.eol){
            clipsString += `${EOL}`;
        }
    });
    return clipsString;
}

