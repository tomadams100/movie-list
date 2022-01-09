import { Button, Container, Modal, Col, Row } from "react-bootstrap"
import { useState } from "react";

export default function Movie_Details_Modal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const movie = props

    return(
        <>
        <Button variant="secondary" onClick={handleShow}>
        See Details
        </Button>

        <Container className="p-0">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title style={{"color":"#141414"}}>
            {movie.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="p-1 d-flex justify-content-center">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{"width" : "20rem"}} alt={movie.title} />
        </div>
        <p>Ranking: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Overview:</p>
        <p>{movie.overview}</p>
        </Modal.Body>
        </Modal>
        </Container>
        </>
    )
}