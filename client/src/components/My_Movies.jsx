import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function My_Movies(props) {
    const {user} = useContext(AuthContext)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    console.log("user being sent to the back: ",user)
    useEffect(()=>{
        axios.post(`/loggedInUser`,user)
        .then(res => {
            setLoggedInUser(res.data.user)
            setLoaded(true)
        })
        .catch(console.log)
    },[])
    if (loaded) return(
        <div>
        <h1>Welcome {loggedInUser&& loggedInUser.username}</h1>
        <h3>These are your movies:</h3>
        <p>Jungle Book</p>
        <p>Freaky Friday</p>
        </div>
    )
    else return <h1>Loading.......!</h1>
}