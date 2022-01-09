import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button, Col, Row } from "react-bootstrap";
import Loading from "./Loading";

export default function Movie_Details(props) {
    const {movieId} = useParams()
    const [movie, setMovie] = useState(null)
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
            setMovie(response.data)
        })
        .catch(console.log)
    },[])
    if (movie) return(
        <div className="pt-3">
        <Row className="m-0 text-start">
            <Col className="d-flex justify-content-center">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{"width" : "20rem"}} alt={movie.title} />
            </Col>
            <Col>
            <h3>{movie.title}</h3>
            <p>Ranking: {movie.vote_average}</p>
            <p>Run Time: {movie.runtime} mins</p>
            <p>Genres:</p>
            <ul>{movie.genres.map(genre=>{
                return <li>{genre.name}</li>
            })}</ul>
            <p>{movie.overview}</p>
            <Button as={Link} to={`/all-movies`}>Back to All Movies</Button>
            </Col>
        </Row>
        </div>
    )
    else return (<Loading />)
}