import { Col, Container, Row } from "react-bootstrap";

export default function About(props) {
    return(
        <Container>
        <Col>
        <Row className="text-start p-2">
        <h2>About Movie List</h2>
        <p>
            Have you ever felt that there are so many movies you want to watch, yet you can never quite remember what they're called?
            <br />
            <br />
            Well, now you can use Movie List to create a list of movies that you're planning to watch.
        </p>
        <p>Movie List is a full-stack web application and was created by Tom Adams.
        <br />
        <br />
        The tech-stack includes:
        </p>
        <ul className="" style={{"list-style-type": "none"}}>
            <li>MongoDB</li>
            <li>Express</li>
            <li>React</li>
            <li>Node</li>
            <li>REST API</li>
        </ul>
        </Row>
        </Col>
        </Container>
    )
}