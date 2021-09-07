import React, {useState} from 'react';
import AuthorTitle from "./author/AuthorTitle";
import {Col, Container} from "react-bootstrap";
import AuthorsList from "./author/AuthorsList";
import AddAuthor from "./author/AddAuthor";
import CreateForm from "./author/CreateForm";
import {IAuthor, IBook} from "../types/LibraryTypes";
import UpdateAuthor from "./validation/UpdateAuthor";

type AuthorsProps = {
    authors:IAuthor[]
    books:IBook[] | null
    onAuthorAdded:(author:IAuthor) => void
    onAuthorDelete:(id:string) => void
    onAuthorUpdate:(author:IAuthor) => void
}

const Authors:React.FC<AuthorsProps> = (props) => {

    const {authors, books, onAuthorAdded, onAuthorDelete, onAuthorUpdate} = props;

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState<boolean>(false);
    const [newAuthorName, setNewAuthorName] = useState<string | null>(null);
    const [updatedAuthorId, setUpdatedAuthorId] = useState<string | null>(null);

    const handleOnAddClicked = () => {
        setIsFormVisible(true);
        setIsUpdateFormVisible(false);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
        setIsUpdateFormVisible(false);
    }

    const handleOnEditButtonClicked = (authorName:string,id:string) => {
        setIsUpdateFormVisible(true);
        setIsFormVisible(false);
        setNewAuthorName(authorName);
        setUpdatedAuthorId(id);
    }

    return(
        <Col xs={12} md={6} className='mt-3 pt-0 mt-md-0'>
            <Container fluid className='authors'>
                <AuthorTitle />
                <AuthorsList
                    authors={authors}
                    books={books}
                    onAuthorDelete={onAuthorDelete}
                    onAuthorUpdate={onAuthorUpdate}
                    onEditButtonClicked={handleOnEditButtonClicked}
                />
                <AddAuthor onAddClick={handleOnAddClicked}/>
                {isFormVisible &&
                <CreateForm
                    onFormClose={handleFormClose}
                    onAuthorAdded={onAuthorAdded}
                />}
                {isUpdateFormVisible &&
                <UpdateAuthor
                    author={newAuthorName}
                    id={updatedAuthorId}
                    onAuthorUpdate={onAuthorUpdate}
                    onFormClose={handleFormClose}
                />}
            </Container>
        </Col>
    )
}

export default Authors;