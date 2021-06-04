import React from 'react';
import AuthorTitle from "./author/AuthorTitle";
import {Col, Container, Row} from "react-bootstrap";
import AuthorsList from "./author/AuthorsList";
import AddAuthor from "./author/AddAuthor";
import CreateForm from "./author/CreateForm";

const Authors:React.FC = () => {
    return(
        <Container fluid className='authors'>
            <Row>
                <Col className='px-4 pb-4'>
                    <AuthorTitle />
                </Col>
            </Row>
            <Row>
                <Col className='px-4'>
                    <AuthorsList />
                </Col>
            </Row>
            <Row>
                <Col className='px-4'>
                    <AddAuthor />
                </Col>
            </Row>
            <Row className='mt-5'>
                <CreateForm />
            </Row>
        </Container>
    )
}

export default Authors;