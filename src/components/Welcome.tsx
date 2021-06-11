import React from 'react';
import {Row, Col, Container, Image} from "react-bootstrap";
import libraryImg from '../assets/images/library.jpg';

const Welcome:React.FC = () => {
    return(
        <Container fluid={true} className='welcome'>
            <Row>
                <Col xs={12} className='mt-2 mb-1 text-center'>
                    <h1>My Library</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className='mx-0 px-0'>
                    <Image src={libraryImg} placeholder="Library"/>
                </Col>
            </Row>
            <Row>
                <Col xs={{span:2, offset:10}} className='mt-1 px-0 pl-5' >
                    <p>photo by <a href="https://unsplash.com/photos/ajE5goOGzZc" target="_blank" rel="noreferrer">
                            Anna Hunko
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Welcome;