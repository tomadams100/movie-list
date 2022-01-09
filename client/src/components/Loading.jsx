import { Container, Col, Spinner } from "react-bootstrap"
export default function Loading(props) {
    return(
        <div className="vh-100 d-flex flex-column justify-content-center">
    <Container>
        <Col className="d-flex justify-content-center">
            <Spinner animation="border" variant="danger" />
            <h1>Loading...</h1>
        </Col>
    </Container>
    
    </div>
    )
}