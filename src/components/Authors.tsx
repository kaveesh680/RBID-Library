import React, {useState} from 'react';
import AuthorTitle from "./author/AuthorTitle";
import {Col, Container} from "react-bootstrap";
import AuthorsList from "./author/AuthorsList";
import AddAuthor from "./author/AddAuthor";
import CreateForm from "./author/CreateForm";
import {IAuthor} from "../types/LibraryTypes";

type AuthorsProps = {
    authors:IAuthor[] | null
    onAuthorAdded:(author:IAuthor) => void
    onAuthorDelete:(id:string) => void
    onAuthorUpdate:(author:IAuthor) => void
}

const Authors:React.FC<AuthorsProps> = (props) => {

    const {authors, onAuthorAdded, onAuthorDelete, onAuthorUpdate} = props;

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOnAddClicked = () => {
        setIsFormVisible(true);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
    }

    return(
        <Col xs={12} md={6} className='mt-0 pt-0'>
            <Container fluid className='authors'>
                <AuthorTitle />
                <AuthorsList
                    authors={authors}
                    onAuthorDelete={onAuthorDelete}
                    onAuthorUpdate={onAuthorUpdate}
                />
                <AddAuthor onAddClick={handleOnAddClicked}/>
                {isFormVisible &&
                <CreateForm
                    onFormClose={handleFormClose}
                    onAuthorAdded={onAuthorAdded}
                />}
            </Container>
        </Col>
    )
}

export default Authors;