import React from 'react';
import Book from "./Book";
import {Col, Row} from "react-bootstrap";
import {IAuthor, IBook, IBookDetails} from "../../types/LibraryTypes";

type BooksListProps = {
    books:IBook[] | null
    onBookDelete:(id:string) => void
    authors:IAuthor[] | null
    onBookUpdate:(book:IBook) => void
    onEditButtonClicked:(bookDetails:IBookDetails,id:string) => void
}

const BooksList:React.FC<BooksListProps> = (props) => {

    const {books, onBookDelete, authors, onBookUpdate, onEditButtonClicked} = props;



    if(!books || books.length === 0){
        return <label className='font-italic ml-2 mb-3 empty-label'>No books listed here.</label>
    }

    const renderBooks = () => {
        if(!books){
            return;
        }

        return books.map((book:IBook, index:number) => <Book key={book.id}
                                                             id={book.id}
                                                             num={index+1}
                                                             bookDetails={book.details}
                                                             onBookDelete={onBookDelete}
                                                             authors={authors}
                                                             onBookUpdate={onBookUpdate}
                                                             onEditButtonClicked={onEditButtonClicked}
            />
        )
    }

    return(
        <Row>
            <Col className='px-4'>
                <ul className='list-unstyled'>
                    {renderBooks()}
                </ul>
            </Col>
        </Row>
    )
}

export default BooksList;