import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Movie_Details(props) {
    const {movieId} = useParams()
    const [movie, setMovie] = useState(null)
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
            console.log("movie response: ",response)
            setMovie(response.data)
        })
        .catch(console.log)
    },[])
    console.log("movie:",movie)
    if (movie) return(
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Ranking: {movie.vote_average}</p>
            <p>Run Time: {movie.runtime} mins</p>
            <p>Genres:</p>
            <ul>{movie.genres.map(genre=>{
                return <li>{genre.name}</li>
            })}</ul>
            <p>Overview: {movie.overview}</p>
            <Link to={`/all-movies`}>Back to All Movies</Link>
        </div>
    )
    else return (<p>Loading...</p>)
}