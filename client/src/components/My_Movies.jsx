import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Movie_Details_Modal from "./Movie_Details_Modal";
import RemoveMovieButton from "./buttons/RemoveMovieButton";
import AllMoviesButton from "./buttons/AllMoviesButton";

export default function My_Movies(props) {
  const { user } = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loadedMyMovies, setLoadedMyMovies] = useState(false);
  const [myMovies, setMyMovies] = useState([]);
  const [showButton, setShowButton] = useState(true)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .post(`/loggedInUser`, user)
      .then((res) => {
        setLoggedInUser(res.data.user);
        setLoaded(true);
      })
      .catch(console.log);
  }, [showButton]);

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

function toggleShowButton() {
  setShowButton(!showButton)
}

  if (loaded)
    return (
      <div>
        <h1>Welcome {loggedInUser && loggedInUser.username}</h1>
      
        {loggedInUser.watchList.length !== 0 &&(
        <>
        <h3>These are your movies:</h3>
        <Container>
          <Row>
            {loggedInUser.watchList.map((movie) => {
              return (
                <Col key={movie.id}>
                  <div>
                    <img
                      className="rounded movieImage"
                      style={{ width: "15rem" }}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                    <p>Ranking: {movie.vote_average}</p>
                  </div>
                  <Movie_Details_Modal {...movie} />
                  <RemoveMovieButton {...movie} {...user} toggleShowButton={toggleShowButton} />
                </Col>
              );
            })}
          </Row>
        </Container>
        </>
        )}
        {loggedInUser.watchList.length === 0 &&
          <div className="pt-5">
            <h3>You haven't added any movies to your list yet!</h3>
            <p>Go to My Movies to start...</p>
            <AllMoviesButton />
          </div>
        }
      </div>
    );
  else return (<Loading />)
}
