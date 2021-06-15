import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DeleteValidationBookProps = {
    onDeleteValidationClose:() => void
    showDeleteValidation:boolean
    onDelete:() => void
}

const DeleteValidationBook:React.FC<DeleteValidationBookProps> = (props) => {

    const {onDeleteValidationClose, showDeleteValidation, onDelete} = props;

    const notify = () => toast.error("Book Deleted!",{
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar:true
    });

    return(
        <Modal show={showDeleteValidation} onHide={onDeleteValidationClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
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

export default DeleteValidationBook;