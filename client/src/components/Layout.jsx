import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button,Navbar, Container,Nav } from "react-bootstrap";


export default function Layout(props) {
    const {logOutUser, isLoggedIn} = useContext(AuthContext)
    return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/"><img style={{"width":"9rem"}} src={require("../img/Movie_List_Logo.png")} alt="Movie List" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/all-movies">All Movies</Nav.Link>
                    <Nav.Link as={Link} to="/my-movies">My Movies</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    {!isLoggedIn &&
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                    }
                    {!isLoggedIn &&
                    <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                    }
                    {isLoggedIn &&
                    <Nav.Link as={Link} to="#" onClick={logOutUser}>Log Out</Nav.Link>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}