import * as React from "react";
import * as Types from "../../types";
interface Props {
    clip: Types.Clip;
}
const ClipRow = (props: Props) => {
    const { clip } = props;
    let loc = "";
    let icon = null;
    let quote = "";

    if (clip.location.type === "highlight") {
        loc = "Highlight at ";
        icon = (
            <i
                className="fa fa-quote-left khb-clipslist-icon"
                aria-hidden="true"
            />
        );
        quote = `"`;
    } else if (clip.location.type === "note") {
        loc = "Note at ";
        icon = (
            <i
                className="fa fa-sticky-note-o khb-clipslist-icon"
                aria-hidden="true"
            />
        );
    }

    loc += `Location: ${clip.location.value}`;

    return (
        <div>
            <div>
                {icon}&nbsp;
                <span className="khb-clipslist-cliploc">{loc}</span> --{" "}
                <span className="khb-clipslist-clipdate">
                    {clip.date.format("MMMM DD, YYYY h:mm:ss a")}
                </span>
            </div>
            <div className="khb-clipslist-cliptext">
                {quote}
                {clip.text}
                {quote}
            </div>
            <hr />
        </div>
    );
};
export default ClipRow;
