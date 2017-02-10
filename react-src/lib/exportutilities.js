
/**
 * Generate the string for a clip to export
 */
export function GenerateClipsString(clips, checkboxes, clipSeparator, EOL){
    const includeLocation = checkboxes.location;
    const includeDate = checkboxes.date;
    let clipsString = "";
    clips.map(function(clip){
        let quote = "";
        if(clipsString !== ""){
            clipsString += `${EOL}${clipSeparator}${EOL}`;
        }

        if(clip.location.type === 'highlight') {
            clipsString += "Highlight at ";
            quote=`"`;
        } else if(clip.location.type === 'note'){
            clipsString += "Note at ";
        }

        if(includeLocation){
            clipsString += `Location: ${clip.location.value}`;
        }

        if(includeLocation && includeDate){
            clipsString += " -- ";
        }

        if(includeDate){
            clipsString += `${clip.date.format("MMMM DD, YYYY h:mm:ss a")}`;
        }

        if(includeLocation || includeDate){
            clipsString += `${EOL}`;
        }

        clipsString += `${quote}${clip.text}${quote}`;

    });
    return clipsString;
}

/**
 * Strip the title of unnecessary characters,
 * and replace spaces with underscores.
 */
export function CleanTitle(title){
    return title.replace(/ /g, '_').replace(/\W/g, '');
}

