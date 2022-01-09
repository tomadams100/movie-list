import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Redirect, Route, useNavigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PrivateRoute(props) {
    const {to,exact, component: Component, ...restProps} = props
    const {isLoggedIn, isLoading} = useContext(AuthContext)
    let navigate = useNavigate()

    if (isLoading) return <Loading />

    if (isLoggedIn) return <Outlet />
    else return (
        <div className="p-5">
            <h3>Please sign up or login to start creating your movie list!</h3>
            <br />
            <Button as={Link} to={"/signup"}>Sign Up</Button>
            <br />
            <br />
            <Button as={Link} to={"/login"}>Login</Button>
        </div>
    )

    /* if (!isLoggedIn) {
        return navigate(`/my-movies`)
    } */

   // return <Route to={to} exact={exact} component={Component} {...restProps} />
}