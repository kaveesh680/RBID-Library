import React, {useState} from 'react';
import {Col, Container} from "react-bootstrap";
import BookTitle from "./book/BookTitle";
import BooksList from "./book/BooksList";
import AddBook from "./book/AddBook";
import CreateBook from "./book/CreateBook";
import {IAuthor, IBook} from "../types/LibraryTypes";

type BooksProps = {
    authors:IAuthor[] | null
    books:IBook[] | null
    onBookAdded:(book:IBook) => void
    onBookDelete:(id:string) => void
    onBookUpdate:(book:IBook) => void
}

const Books:React.FC<BooksProps> = (props) => {

    const {authors, books, onBookAdded, onBookDelete, onBookUpdate} = props;

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
                <BooksList books={books} onBookDelete={onBookDelete} authors={authors} onBookUpdate={onBookUpdate}/>
                <AddBook onAddClick={handleOnAddClick}/>
                {isFormVisible && <CreateBook onFormClose={handleFormClose} onBookAdded={onBookAdded} authors={authors}/>}
            </Container>
        </Col>
    )
}

export default Books;