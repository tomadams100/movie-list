import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Search from "./Search";
import { AuthContext } from "../context/auth.context";
import { Button, Container, Row, Col } from "react-bootstrap";
import Loading from "./Loading";
import DetailsButton from "./buttons/DetailsButton";
import AddMovieButton from "./buttons/AddMovieButton";
import RemoveMovieButton from "./buttons/RemoveMovieButton";


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
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
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
                setAllMovies(response.data.results)
            })
            .catch(console.log)
        } else {
            setAllMovies(popularMovies)
        }
    },[search,showButton])

    function toggleShowButton() {
        setShowButton(!showButton)
    }

    if (allMovies !== null) return(
        <div className="pt-3">
            <Search searchButton={handleSearch} />
            <br />
            <Container>
                <Row>
            {
                allMovies && allMovies.map(movie=>{
                    return(
                        <Col key={movie.id} className="pb-3">
                            <img className="rounded movieImage pb-2" style={{"width" : "12rem"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h3 className="movie-title">{movie.title}</h3>
                            <p>Ranking: {movie.vote_average}</p>
                            <div className="d-flex justify-content-center">
                            <DetailsButton {...movie} />
                            {loggedInUser&&(
                                <>
                                {!loggedInUser.watchList.some(e=>e.id===movie.id)&&<AddMovieButton {...movie} {...user} toggleShowButton={toggleShowButton} />}
                                {loggedInUser.watchList.some(e=>e.id===movie.id)&&<RemoveMovieButton {...movie} {...user} toggleShowButton={toggleShowButton} />}
                                </>
                            )}
                            </div>
                        </Col>
                    )
                })
            }
            </Row>
            </Container>
        </div>
    )
    else return <Loading />
}