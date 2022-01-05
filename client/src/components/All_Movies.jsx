import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Search from "./Search";

export default function All_Movies(props) {
    const [allMovies, setAllMovies] = useState(null)
    const [search, setSearch] = useState("")
    const [popularMovies, setPopularMovies] = useState(null)
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
            console.log("all movies response: ",response)
            setAllMovies(response.data.results)
            setPopularMovies(response.data.results)
        })
        .catch(console.log)
    },[])
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
    },[search])
    return(
        <div>
            <Search searchButton={handleSearch} />
            <br />
            {
                allMovies && allMovies.map(movie=>{
                    return(
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Ranking: {movie.vote_average}</p>
                            <Link to={`/movie/${movie.id}`}>See Details</Link>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}