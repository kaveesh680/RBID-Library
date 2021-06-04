import React, {useState} from 'react';
import {Col, Container} from "react-bootstrap";
import BookTitle from "./book/BookTitle";
import BooksList from "./book/BooksList";
import AddBook from "./book/AddBook";
import CreateBook from "./book/CreateBook";

const Books:React.FC = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOnAddClick = () => {
        setIsFormVisible(true);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
    }

    return(
        <Col xs={12} md={6} className='mt-0 pt-0'>
            <Container fluid className='books'>
                <BookTitle />
                <BooksList />
                <AddBook onAddClick={handleOnAddClick}/>
                {isFormVisible && <CreateBook onFormClose={handleFormClose}/>}
            </Container>
        </Col>
    )
}

export default Books;