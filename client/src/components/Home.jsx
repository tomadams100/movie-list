import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Home(props) {
    return(
        <div className="p-5">
        <h1>So many movies, so little time!</h1>
        <p>Not sure what to watch? Make a list!</p>
        <Button style={{"width":"7rem"}} className="mx-auto" as={Link} to="/all-movies">All Movies</Button>
        </div>
    )
}