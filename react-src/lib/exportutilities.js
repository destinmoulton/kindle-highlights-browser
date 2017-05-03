
/**
 * Generate the string for a clip to export
 */
export function GenerateClipsString(clips, checkboxes, radios, separators, EOL){
    const includeLocation = checkboxes.location;
    const includeDate = checkboxes.date;
    
    let quotationMark = (checkboxes.quote) ? '"' : '';

    let clipsString = "";
    let titles = Object.keys(clips);
    
    titles.forEach((title)=>{

        let bookBegin = true;
        clipsString += `${EOL}${separators.title}${EOL}`;
        clipsString += `${title}${EOL}`;
        clipsString += `By ${clips[title][0]['authorFullName']}${EOL}`;
        clipsString += `${separators.title}${EOL}`;
        
        clips[title].forEach((clip)=>{

            if (!bookBegin && clipsString !== "") {
                if(radios.clip_separator === "text"){
                    clipsString += `${EOL}${separators.clip}${EOL}`;
                } else if(radios.clip_separator === "eol"){
                    clipsString += `${EOL}${EOL}`;
                } else {
                    clipsString += `${EOL}`;
                }
            }

            if (includeLocation) {
                if (clip.location.type === 'highlight') {
                    clipsString += "Highlight at ";
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

            clipsString += `${quotationMark}${clip.text}${quotationMark}`;
            bookBegin = false;
        });

        clipsString += `${EOL}`;

    });
    return clipsString;
}

