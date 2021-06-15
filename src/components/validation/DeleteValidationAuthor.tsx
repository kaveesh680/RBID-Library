import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const notify = () => toast.error("Author Deleted!",{
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar:true
    });

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
                    notify();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteValidationAuthor;