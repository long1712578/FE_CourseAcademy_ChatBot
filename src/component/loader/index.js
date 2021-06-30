import React from "react"
import "./loader.css"
import {Container, Row} from "react-bootstrap";

const Loader = () =>
{
    return(
        <Container className="mt-4 mb-4">
            <Row className="flex-row align-items-center justify-content-center">
                <div className="loader"/>
            </Row>
        </Container>
    )
}

export default Loader