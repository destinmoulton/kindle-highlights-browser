import * as React from "react";
import * as Types from "../../types";

import { Card, Row, Col } from "react-bootstrap";
interface Props {
    clip: Types.Clip;
}
const ClipRow = (props: Props) => {
    const { clip } = props;
    let loc = "";

    let content = null;
    let icon = null;
    if (clip.type === Types.ClipType.Highlight) {
        loc = "Highlight at ";
        icon = (
            <i
                className="fa fa-quote-left khb-clipcard-icon"
                aria-hidden="true"
            />
        );
        content = (
            <Col xs={12} className="khb-clipcard-highlight">
                {clip.highlight}
            </Col>
        );
    } else if (clip.type === Types.ClipType.Note) {
        loc = "Your Note at ";
        icon = (
            <i
                className="fa fa-sticky-note khb-clipcard-icon"
                aria-hidden="true"
            />
        );
        content = (
            <Col xs={12} className="khb-clipcard-note">
                {clip.note}
            </Col>
        );
    } else if (clip.type === Types.ClipType.HighlightWithNote) {
        loc = "Highlight with Your Note at ";
        icon = (
            <React.Fragment>
                <i
                    className="fa fa-quote-left khb-clipcard-icon"
                    aria-hidden="true"
                />
                &nbsp;
                <i
                    className="fa fa-sticky-note khb-clipcard-icon"
                    aria-hidden="true"
                />
            </React.Fragment>
        );
        content = (
            <React.Fragment>
                <Col xs={6} className="khb-clipcard-highlight">
                    {clip.highlight}
                </Col>
                <Col
                    xs={6}
                    className="khb-clipcard-note khb-clipcard-note-with-highlight"
                >
                    {clip.note}
                </Col>
            </React.Fragment>
        );
    }

    loc += `Location: ${clip.location.value}`;

    return (
        <Card className="khb-clipcard-card">
            <Card.Body className="khb-clipcard-body">
                <Row>{content}</Row>
            </Card.Body>
            <Card.Footer className="khb-clipcard-footer">
                {icon}&nbsp;&nbsp;
                <span className="khb-clipslist-cliploc">{loc}</span> --{" "}
                <span className="khb-clipslist-clipdate">
                    {clip.date.format("MMMM DD, YYYY h:mm:ss a")}
                </span>
            </Card.Footer>
        </Card>
    );
};
export default ClipRow;
