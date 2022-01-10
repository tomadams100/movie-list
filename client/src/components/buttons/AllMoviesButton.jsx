import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllMoviesButton(props) {
    return(
        <Button style={{"width":"7rem"}} className="mx-auto" variant="light" as={Link} to="/all-movies">All Movies</Button>
    )
}