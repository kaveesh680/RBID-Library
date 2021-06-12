import React from 'react';
import {Button, Modal} from "react-bootstrap";

type DeleteValidationAuthorProps = {
    onDeleteValidationClose:() => void
    showDeleteValidation:boolean
    onDelete:() => void
    assignBooks: string[]
    author:string
    isAssignToABook:boolean
}

const DeleteValidationAuthor:React.FC<DeleteValidationAuthorProps> = (props) => {

    const {onDeleteValidationClose, showDeleteValidation, onDelete, assignBooks, isAssignToABook, author} = props;

    return(
        <Modal show={showDeleteValidation} onHide={onDeleteValidationClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure? {isAssignToABook &&
            `${author} is assigned to ${assignBooks.map((book:string) => " "+book)}.`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDeleteValidationClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {
                    onDeleteValidationClose();
                    onDelete();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteValidationAuthor;