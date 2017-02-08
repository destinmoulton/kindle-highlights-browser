
/**
 * Generate the string for a clip to export
 */
export default function ExportClipsGenerator(clips, checkboxes, clipSeparator, EOL){
    const includeLocation = checkboxes.location;
    const includeDate = checkboxes.date;
    let clipsString = "";
    clips.map(function(clip){
        if(clipsString !== ""){
            clipsString += `${EOL}${clipSeparator}${EOL}`;
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

        clipsString += `"${clip.text}"`;

    });
    return clipsString;
}