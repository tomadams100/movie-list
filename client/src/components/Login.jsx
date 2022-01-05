import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
export default function Login(props) {
    let navigate = useNavigate();
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
        const axiosCall = await axios.post(`/login`, formState)
        
            console.log(formState)
            //console.log("response from DB=>", response)
            const JWTToken = await axiosCall.data.authToken;
            const logsin = await logInUser(JWTToken);
            const navs = await navigate(`/my-movies`)
    }
    return(
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Email" name="email" value={formState.email} onChange={handleInput} required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleInput} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}