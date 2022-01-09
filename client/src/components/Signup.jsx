import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Signup(props) {
    let navigate = useNavigate()
    const [formState, setFormState] = useState({
        username:"",
        email:"",
        password:""
    })

    function handleInput(event) {
        setFormState({...formState, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios
        .post(`/signup`, formState)
        .then((response) => {
            console.log("response from DB=>", response);
            navigate('/login');
        })
        .catch((err) => {
            console.log("err: ",err)
        });
    }
    return(
        <div className="pt-5">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit} className="w-25 mx-auto">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={formState.username} onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formState.email} onChange={handleInput} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formState.password} onChange={handleInput} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}