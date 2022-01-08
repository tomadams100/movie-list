import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function My_Movies(props) {
    const {user} = useContext(AuthContext)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [loadedMyMovies, setLoadedMyMovies] = useState(false)
    const [myMovies, setMyMovies] = useState([])

    useEffect(()=>{
        console.log(`user: ${user}`)
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
         {loggedInUser.watchList.map(movie=>{ 
            console.log("this is the movie: ", movie)
            return(
                <p>{movie.title}</p>
            )
        })}
        </div>
    )
    else return <h1>Loading.......!</h1>
}