import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {

    const year = new Date().getFullYear();

    return (<Container>
                <Row>
                    <Col className='text-center'>
                        <footer>Copyright © {year}</footer>
                    </Col>

                </Row>
            </Container>
    )

}

export default Footer;