import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function DetailsButton(props) {
    const movie = props
    return(
        <Button className="m-1" variant="secondary" as={Link} to={`/movie/${movie.id}`} style={{"width":"5rem"}}>Details</Button>
    )
}