import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Form, Button } from "react-bootstrap";

export default function Login(props) {
    let navigate = useNavigate()
    const { logInUser } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        email:"",
        password:""
    })
    function handleInput(event) {
        setFormState({...formState, [event.target.name]: event.target.value})
    }
    async function handleSubmit(event) {
        event.preventDefault();
        axios.post(`/login`, formState)
        .then((response)=>{
            const JWTToken = response.data.authToken;
            logInUser(JWTToken);
            navigate(`/my-movies`);
        })
        .catch(console.log)
    }
    return(
        <div className="center">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} className="mx-auto loginForm">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formState.email} onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formState.password} onChange={handleInput} />
                </Form.Group>

                <Button variant="light" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    )
}