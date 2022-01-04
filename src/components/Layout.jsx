import { Link, Outlet } from "react-router-dom";

export default function Layout(props) {
    return(
        <div>
        <h1>Movie List</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/all-movies">All Movies</Link>
                </li>
                <li>
                    <Link to="/my-movies">My Movies</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}