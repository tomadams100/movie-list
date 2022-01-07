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

    useEffect(()=>{ // this useEffect sends the userId to /loggedInUser on the back, and returns user's data
        console.log(`user: ${user}`)
        axios.post(`/loggedInUser`,user)
        .then(res => {
            setLoggedInUser(res.data.user) // saves the user's data into loggedInUser state
            setLoaded(true) //set's loaded to true
        })
        .catch(console.log)
    },[]) 
    useEffect(()=>{
        if (loaded) { // if the user's data has been loaded
            for (let i=0; i<loggedInUser.watchList.length; i++) { //loop through the user's watchList
                //fetch movie details from the API
                axios.get(`https://api.themoviedb.org/3/movie/${loggedInUser.watchList[i]}?api_key=${process.env.REACT_APP_API_KEY}`)
                .then((response)=>{
                    //myMovies.push(response.data) //push the movie details to myMovies array  
                    console.log("data ===>", response.data) 
                    setMyMovies(myMovies => [...myMovies, response.data])
                    if (i===loggedInUser.watchList.length-1) setLoadedMyMovies(true) //if we're on the final movie, then loadedMyMovies = true
                })
                .catch(error=>console.error(error))
            }
            console.log("myMovies: ", myMovies) 
        }
    },[loaded]) 
    if (loaded&&loadedMyMovies) return( //if the user's data and the movies data from their watchList are both loaded
        <div>
        <h1>Welcome {loggedInUser&& loggedInUser.username}</h1>
        <h3>These are your movies:</h3>
         {myMovies.map(movie=>{ 
            console.log("this is the movie: ", movie)
            return(
                <p>{movie.title}</p>
            )
        })} 
        </div>
    )
    else return <h1>Loading.......!</h1>
}