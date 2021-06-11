import React from 'react';
import Author from "./Author";
import {Col, Row} from "react-bootstrap";
import {IAuthor, IBook} from "../../types/LibraryTypes";

type AuthorsListProps = {
    authors:IAuthor[] | null
    books:IBook[] | null
    onAuthorDelete:(id:string) => void
    onAuthorUpdate:(author:IAuthor) => void
}

const AuthorsList:React.FC<AuthorsListProps> = (props) => {

    const {authors,onAuthorDelete, onAuthorUpdate, books} = props;

    if(!authors || authors.length === 0){
        return <label className='font-italic ml-2 mb-3 empty-label'>No authors listed here.</label>
    }

    const renderAuthors = () => {
        if(!authors){
            return;
        }

        return authors.map((author:IAuthor, index:number) => <Author key={author.id}
                                                                     id={author.id}
                                                                     num={index+1}
                                                                     author={author}
                                                                     books={books}
                                                                     onAuthorDelete={onAuthorDelete}
                                                                     onAuthorUpdate={onAuthorUpdate}
            />
        )
    }

    return(
        <Row>
            <Col className='px-4'>
                <ul className='list-unstyled'>
                    {renderAuthors()}
                </ul>
            </Col>
        </Row>
    )
}

export default AuthorsList;