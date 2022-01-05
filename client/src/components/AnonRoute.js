import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Redirect, Route, Outlet } from "react-router-dom";

export default function AnonRoute(props) {
    const { to, exact, component: Component, ...restProps } = props;

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading ⏳
    console.log("isLoading anon route: ",isLoading)
    if (isLoading) return <h1 style={{color: "red"}}>Loading ...</h1>;

    return <Outlet />
    // If the user is already logged in, redirect him to home page
    //if (isLoggedIn) return <Redirect to="/events?view=list" />;

    // If the user is not logged in yet, allow him to see the page
    //return <Route to={to} exact={exact} component={Component} {...restProps} />
}