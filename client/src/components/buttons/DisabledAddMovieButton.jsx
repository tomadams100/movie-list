import { Button, Tooltip, OverlayTrigger } from "react-bootstrap"

export default function DisabledAddMovieButton(props) {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Log In to Add Movies
        </Tooltip>
      );

    return (
        <>
        <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
        >
            <Button className="m-1" variant="light" style={{"width":"5rem"}}>Add</Button>
        </OverlayTrigger>
        </>
    )
}