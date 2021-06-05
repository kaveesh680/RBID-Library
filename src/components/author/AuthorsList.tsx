import React from 'react';
import Author from "./Author";
import {Col, Row} from "react-bootstrap";
import {IAuthor} from "../../types/LibraryTypes";

type AuthorsListProps = {
    authors:IAuthor[] | null
    onAuthorDelete:(id:string) => void
}

const AuthorsList:React.FC<AuthorsListProps> = (props) => {

    const {authors,onAuthorDelete} = props;

    if(!authors){
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
                                                                     onAuthorDelete={onAuthorDelete}
        />)
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