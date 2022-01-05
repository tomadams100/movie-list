import axios from "axios";
import { useState } from "react";
import All_Movies from "./All_Movies";

export default function Signup(props) {
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
        console.log("formState: ", formState)
        
        axios
        .post(`/signup`, formState)
        .then((response) => {
            console.log(formState)
            console.log("response from DB=>", response);
        })
        .catch((err) => {
            console.log("err: ",err)
        });
    }
    return(
        <div>
            <h1>Sign Up page</h1>
            <form onSubmit={handleSubmit}>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label htmlFor="usename"><b>Username</b></label>
                <input type="text" placeholder="Username" name="username" value={formState.username} onChange={handleInput} required />

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Email" name="email" value={formState.email} onChange={handleInput} required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleInput} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}