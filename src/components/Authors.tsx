import React, {useState} from 'react';
import AuthorTitle from "./author/AuthorTitle";
import {Col, Container} from "react-bootstrap";
import AuthorsList from "./author/AuthorsList";
import AddAuthor from "./author/AddAuthor";
import CreateForm from "./author/CreateForm";

const Authors:React.FC = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOnAddClick = () => {
        setIsFormVisible(true);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
    }

    return(
        <Col xs={12} md={6} className='mt-0 pt-0'>
            <Container fluid className='authors'>
                <AuthorTitle />
                <AuthorsList />
                <AddAuthor onAddClick={handleOnAddClick}/>
                {isFormVisible && <CreateForm onFormClose={handleFormClose}/>}
            </Container>
        </Col>
    )
}

export default Authors;