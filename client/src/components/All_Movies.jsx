import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Search from "./Search";
import { AuthContext } from "../context/auth.context";


export default function All_Movies(props) {
    const [allMovies, setAllMovies] = useState(null)
    const [search, setSearch] = useState("")
    const [popularMovies, setPopularMovies] = useState(null)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        axios.post(`/loggedInUser`,user)
        .then(res => {
            setLoggedInUser(res.data.user)
            setLoaded(true)
        })
        .catch(console.log)
    },[showButton])
    loggedInUser && console.log("who's logged in? ", loggedInUser.username, " is!")
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
            console.log("all movies response: ",response)
            setAllMovies(response.data.results)
            setPopularMovies(response.data.results)
        })
        .catch(console.log)
    },[showButton])
    function handleSearch(event) {
        setSearch(event.target.value)
    }
    useEffect(()=>{
        if(search!=="") {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`)
            .then(response=>{
                console.log("search response: ",response)
                setAllMovies(response.data.results)
            })
            .catch(console.log)
        } else {
            setAllMovies(popularMovies)
        }
    },[search,showButton])

    function handleAdd(event, movie) {
        event.preventDefault();
        axios
        .post(`/addMovie`, {movie, user})
        .then((response)=>{
            console.log("response from DB=>", response);
            setShowButton(!showButton)
        })
        .catch(console.log)
    }
    function handleRemove(event, movie) {
        event.preventDefault();
        axios
        .post(`/removeMovie`, {movie, user})
        .then((response)=>{
            console.log("response from DB=>", response);
            setShowButton(!showButton)
        })
        .catch(console.log)
    }

    if (loggedInUser) return(
        <div>
            <Search searchButton={handleSearch} />
            <br />
            {
                allMovies && allMovies.map(movie=>{
                    return(
                        <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Ranking: {movie.vote_average}</p>
                            <Link to={`/movie/${movie.id}`}>See Details</Link>
                            <br />
                            {!loggedInUser.watchList.some(e=>e.id===movie.id)&&
                            <>
                            <form onSubmit={(event)=>handleAdd(event,movie)}>
                                <button type="submit">Add to Watch List</button>
                            </form>
                            </>
                            }
                            {loggedInUser.watchList.some(e=>e.id===movie.id)&&
                            <>
                            <form onSubmit={(event)=>handleRemove(event,movie)}>
                                <button type="submit">Remove from Watch List</button>
                            </form>
                            </>
                            }
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
    else return <h1>Loading!!!!!!!!!!!!!!!!!!</h1>
}