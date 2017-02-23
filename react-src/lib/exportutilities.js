
/**
 * Generate the string for a clip to export
 */
export function GenerateClipsString(clips, checkboxes, clipSeparator, EOL){
    const includeLocation = checkboxes.location;
    const includeDate = checkboxes.date;
    let clipsString = "";
    let titles = Object.keys(clips);

    titles.map(function(title){
        let bookBegin = true;
        clipsString += `${EOL}=====================================${EOL}`;
        clipsString += `${title}${EOL}`;
        clipsString += `By ${clips[title][0]['authorFullName']}${EOL}`;
        clipsString += `=====================================${EOL}${EOL}`;
        clips[title].map(function (clip) {
            let quote = "";
            if (!bookBegin && clipsString !== "") {
                clipsString += `${EOL}${clipSeparator}${EOL}`;
            }

            if (clip.location.type === 'highlight') {
                clipsString += "Highlight at ";
                quote = `"`;
            } else if (clip.location.type === 'note') {
                clipsString += "Note at ";
            }

            if (includeLocation) {
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

