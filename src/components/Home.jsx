import { Routes, Route, Outlet, Link } from "react-router-dom";
export default function Home(props) {
    return(
        <div>
        <h1>So many movies, so little time!</h1>
        <p>Not sure what to watch? Make a list!</p>
        <Link to="/all-movies">All Movies</Link>
        </div>
    )
}