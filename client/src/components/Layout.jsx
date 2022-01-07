import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Layout(props) {
    const {logOutUser, isLoggedIn} = useContext(AuthContext)
    return(
        <div>
        <h1>Movie List</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isLoggedIn &&
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                }
                {!isLoggedIn &&
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                }
                {isLoggedIn &&
                <li>
                    <button onClick={logOutUser}>Log Out</button>
                </li>
                }
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
        </div>
    )
}