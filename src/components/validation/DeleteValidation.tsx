import React from 'react';
import {Button, Modal} from "react-bootstrap";

type DeleteValidationProps = {
    onDeleteValidationClose:() => void
    showDeleteValidation:boolean
    onAuthorDelete:() => void
}

const DeleteValidation:React.FC<DeleteValidationProps> = (props) => {

    const {onDeleteValidationClose, showDeleteValidation, onAuthorDelete} = props;

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
                    onAuthorDelete();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteValidation;