import React, {useState} from 'react';
import Book from "./Book";
import {Col, Row} from "react-bootstrap";

const BooksList:React.FC = () => {

    const [isEmpty, setIsEmpty] = useState(true);

    if(isEmpty){
        return <label className='font-italic ml-2 mb-3 empty-label'>No books listed here.</label>
    }

    return(
        <Row>
            <Col className='px-4'>
                <ul className='list-unstyled'>
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                </ul>
            </Col>
        </Row>
    )
}

export default BooksList;