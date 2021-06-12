import React, {useState} from 'react';
import Welcome from "./components/Welcome";
import './assets/styles/main.scss';
import Authors from "./components/Authors";
import Books from "./components/Books";
import {Container, Row} from "react-bootstrap";
import {IAuthor, IBook} from "./types/LibraryTypes";

const ClientApp:React.FC = () => {

    const [authors, setAuthors] = useState<IAuthor[] | null>(null);
    const [books, setBooks] = useState<IBook[] | null>(null);

    const handleOnAuthorAdded = (newAuthor:IAuthor) => {

        const allAuthors:IAuthor[] = authors ? authors.slice() : [];
        allAuthors.push(newAuthor);
        setAuthors(allAuthors);
    }

    const handleOnBookAdded = (newBook:IBook) => {
        const allBooks:IBook[] = books ? books.slice() : [];
        allBooks.push(newBook);
        setBooks(allBooks);
    }

    const handleOnAuthorDelete = (id:string) => {
        if(!authors){
            return;
        }

        const allAuthors:IAuthor[] = authors.slice();
        const leftAuthors:IAuthor[] = allAuthors.filter((author:IAuthor) => author.id !== id);
        setAuthors(leftAuthors);
    }

    const handleOnBookDelete = (id:string) => {
        if(!books){
            return;
        }

        const allBooks:IBook[] = books.slice();
        const leftBooks:IBook[] = allBooks.filter((book:IBook) => book.id !== id);
        setBooks(leftBooks);
    }

    const handleOnAuthorUpdate = (newAuthor:IAuthor) => {
        if(!authors){
            return;
        }

        const allAuthors:IAuthor[] = authors.slice();
        const updatedAuthors:IAuthor[] = allAuthors.map((author:IAuthor) => {
           if(author.id === newAuthor.id){
               return newAuthor;
           }
           return author;
        });
        setAuthors(updatedAuthors);

        if(books){
            const allBooks:IBook[] = books.slice();
            const updatedBooks:IBook[] = allBooks.map((book:IBook) => {
                if(book.details.author.id === newAuthor.id){
                    return {
                        id:book.id,
                        details:{
                            name:book.details.name,
                            author:{
                                id:newAuthor.id,
                                name:newAuthor.name
                            },
                            isbn:book.details.isbn
                        }
                    }
                }
                return book;
            });
            setBooks(updatedBooks);
        }
    }

    const handleOnBookUpdate = (newBook:IBook) => {
        if(!books){
            return;
        }

        const allBooks:IBook[] = books.slice();
        const updatedBooks:IBook[] = allBooks.map((book:IBook) => {
            if(book.id === newBook.id){
                return newBook;
            }
            return book;
        });
        setBooks(updatedBooks);
    }

    return(
        <>
            <Welcome />
            <Container fluid>
                <Row>
                    <Books
                        books={books}
                        authors={authors}
                        onBookAdded={handleOnBookAdded}
                        onBookDelete={handleOnBookDelete}
                        onBookUpdate={handleOnBookUpdate}
                    />
                    <Authors
                        authors={authors}
                        books={books}
                        onAuthorAdded={handleOnAuthorAdded}
                        onAuthorDelete={handleOnAuthorDelete}
                        onAuthorUpdate={handleOnAuthorUpdate}
                    />
                </Row>
            </Container>
        </>
    )
}

export default ClientApp;