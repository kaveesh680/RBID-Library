import React from 'react';
import Welcome from "./components/Welcome";
import './assets/styles/main.scss';
import Authors from "./components/Authors";
import {Col, Container, Row} from "react-bootstrap";

const ClientApp:React.FC = () => {
    return(
        <>
            <Welcome />
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>

                    </Col>
                    <Col xs={12} md={6} className='mt-0 pt-0'>
                        <Authors />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ClientApp;