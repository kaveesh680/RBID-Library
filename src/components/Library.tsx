import React from 'react';
import Welcome from "./Welcome";
import '../assets/styles/main.scss';
import Authors from "./Authors";
import Books from "./Books";
import {Container, Row} from "react-bootstrap";
import {IAuthor, IBook} from "../types/LibraryTypes";
import {RootState} from "../store/reducers/RootReducer";
import {useDispatch, useSelector} from "react-redux";
import {addAuthor, deleteAuthor, updateAuthor} from "../store/actions/AuthorActions";
import {addBook, deleteBook, updateBook} from "../store/actions/BookActions";

const Library: React.FC = () => {

    // const [authors, setAuthors] = useState<IAuthor[] | null>(null);
    // const [books, setBooks] = useState<IBook[] | null>(null);
    const authors: IAuthor[] = useSelector((state: RootState) => state.authorReducer.authors);
    const books: IBook[] = useSelector((state: RootState) => state.bookReducer.books);
    const dispatch = useDispatch();

    const handleOnAuthorAdded = (newAuthor: IAuthor) => {

        // const allAuthors: IAuthor[] = authors ? authors.slice() : [];
        // allAuthors.push(newAuthor);
        // setAuthors(allAuthors);
        dispatch(addAuthor(newAuthor));
    }

    const handleOnBookAdded = (newBook: IBook) => {
        // const allBooks:IBook[] = books ? books.slice() : [];
        // allBooks.push(newBook);
        // setBooks(allBooks);
        dispatch(addBook(newBook));
    }

    const handleOnAuthorDelete = (id: string) => {
        if (!authors) {
            return;
        }

        // const allAuthors:IAuthor[] = authors.slice();
        // const leftAuthors:IAuthor[] = allAuthors.filter((author:IAuthor) => author.id !== id);
        // setAuthors(leftAuthors);
        dispatch(deleteAuthor(id));
    }

    const handleOnBookDelete = (id: string) => {
        if (!books) {
            return;
        }

        // const allBooks:IBook[] = books.slice();
        // const leftBooks:IBook[] = allBooks.filter((book:IBook) => book.id !== id);
        // setBooks(leftBooks);
        dispatch(deleteBook(id));
    }

    const handleOnAuthorUpdate = (newAuthor: IAuthor) => {
        if (!authors) {
            return;
        }

        // const allAuthors:IAuthor[] = authors.slice();
        // const updatedAuthors:IAuthor[] = allAuthors.map((author:IAuthor) => {
        //     if(author.id === newAuthor.id){
        //         return newAuthor;
        //     }
        //     return author;
        // });
        // setAuthors(updatedAuthors);
        dispatch(updateAuthor(newAuthor));

        // if (books) {
        //     const allBooks: IBook[] = books.slice();
        //     const updatedBooks: IBook[] = allBooks.map((book: IBook) => {
        //         if (book.details.author.id === newAuthor.id) {
        //             return {
        //                 id: book.id,
        //                 details: {
        //                     name: book.details.name,
        //                     author: {
        //                         id: newAuthor.id,
        //                         name: newAuthor.name
        //                     },
        //                     isbn: book.details.isbn
        //                 }
        //             }
        //         }
        //         return book;
        //     });
        //     setBooks(updatedBooks);
        // }
    }

    const handleOnBookUpdate = (newBook:IBook) => {
        if (!books) {
            return;
        }

        // const allBooks:IBook[] = books.slice();
        // const updatedBooks:IBook[] = allBooks.map((book:IBook) => {
        //     if(book.id === newBook.id){
        //         return newBook;
        //     }
        //     return book;
        // });
        // setBooks(updatedBooks);
        dispatch(updateBook(newBook));
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

export default Library;