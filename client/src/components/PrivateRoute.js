import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Redirect, Route, useNavigate, Outlet } from "react-router-dom";

export default function PrivateRoute(props) {
    const {to,exact, component: Component, ...restProps} = props
    const {isLoggedIn, isLoading} = useContext(AuthContext)
    let navigate = useNavigate()

    if (isLoading) return <h1>Loading........</h1>

    if (isLoggedIn) return <Outlet />
    else return <h1>You're not logged in, right?</h1>

    /* if (!isLoggedIn) {
        return navigate(`/my-movies`)
    } */

   // return <Route to={to} exact={exact} component={Component} {...restProps} />
}