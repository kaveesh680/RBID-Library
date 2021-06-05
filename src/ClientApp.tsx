import React, {useState} from 'react';
import Welcome from "./components/Welcome";
import './assets/styles/main.scss';
import Authors from "./components/Authors";
import Books from "./components/Books";
import {Container, Row} from "react-bootstrap";
import {IAuthor} from "./types/LibraryTypes";

const ClientApp:React.FC = () => {

    const [authors, setAuthors] = useState<IAuthor[] | null>(null);

    const handleOnAuthorAdded = (newAuthor:IAuthor) => {

        const allAuthors:IAuthor[] = authors ? authors.slice() : [];
        allAuthors.push(newAuthor);
        setAuthors(allAuthors);
    }

    const handleOnAuthorDelete = (id:string) => {
        if(!authors){
            return;
        }

        const allAuthors:IAuthor[] = authors.slice();
        const leftAuthors:IAuthor[] = allAuthors.filter((author:IAuthor) => author.id !== id);
        setAuthors(leftAuthors);
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
    }

    return(
        <>
            <Welcome />
            <Container fluid>
                <Row>
                    <Books />
                    <Authors
                        authors={authors}
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