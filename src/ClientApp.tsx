import React from 'react';
import Welcome from "./components/Welcome";
import './assets/styles/main.scss';
import Authors from "./components/Authors";
import Books from "./components/Books";
import {Container, Row} from "react-bootstrap";

const ClientApp:React.FC = () => {
    return(
        <>
            <Welcome />
            <Container fluid>
                <Row>
                    <Books />
                    <Authors />
                </Row>
            </Container>
        </>
    )
}

export default ClientApp;