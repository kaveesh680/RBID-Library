import React, {useState} from 'react';
import {Col, Container} from "react-bootstrap";
import BookTitle from "./book/BookTitle";
import BooksList from "./book/BooksList";
import AddBook from "./book/AddBook";
import CreateBook from "./book/CreateBook";
import {IAuthor, IBook, IBookDetails} from "../types/LibraryTypes";
import UpdateBook from "./validation/UpdateBook";

type BooksProps = {
    authors:IAuthor[] | null
    books:IBook[] | null
    onBookAdded:(book:IBook) => void
    onBookDelete:(id:string) => void
    onBookUpdate:(book:IBook) => void
}

const Books:React.FC<BooksProps> = (props) => {

    const {authors, books, onBookAdded, onBookDelete, onBookUpdate} = props;

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState<boolean>(false);
    const [updatedBookId, setUpdatedBookId] = useState<string | null>(null);
    const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);

    const handleOnAddClick = () => {
        setIsFormVisible(true);
        setIsUpdateFormVisible(false);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
        setIsUpdateFormVisible(false);
    }

    const handleOnEditButtonClicked = (bookDetails:IBookDetails,id:string) => {
        setIsUpdateFormVisible(true);
        setIsFormVisible(false);
        setUpdatedBookId(id);
        setBookDetails(bookDetails);
    }

    return(
        <Col xs={12} md={6} className='mt-0 pt-0'>
            <Container fluid className='books'>
                <BookTitle />
                <BooksList
                    books={books}
                    onBookDelete={onBookDelete}
                    authors={authors}
                    onBookUpdate={onBookUpdate}
                    onEditButtonClicked={handleOnEditButtonClicked}
                />
                <AddBook onAddClick={handleOnAddClick}/>
                {isFormVisible && <CreateBook
                                        onFormClose={handleFormClose}
                                        onBookAdded={onBookAdded}
                                        authors={authors}
                                    />
                }
                {isUpdateFormVisible && <UpdateBook
                    onFormClose={handleFormClose}
                    authors={authors}
                    onBookUpdate={onBookUpdate}
                    bookDetails={bookDetails ? bookDetails : {name:'',author:{name:'',id:''},isbn:''}}
                    id={updatedBookId}
                />}
            </Container>
        </Col>
    )
}

export default Books;