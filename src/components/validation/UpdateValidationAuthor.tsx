import React, {FormEvent, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {IAuthor} from "../../types/LibraryTypes";

type UpdateValidationProps = {
    onUpdateValidationClose:() => void
    showUpdateValidation:boolean
    onAuthorUpdate:(author:IAuthor) => void
    id:string
}

const UpdateValidationAuthor:React.FC<UpdateValidationProps> = (props) => {

    const {onUpdateValidationClose, showUpdateValidation, onAuthorUpdate, id} = props;

    const [newAuthorName, setNewAuthorName] = useState<string | null>(null);

    const handleNewAuthorNameChange = (newName:string) => {
        setNewAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!newAuthorName){
            return;
        }

        const newAuthor:IAuthor = {name:newAuthorName,id:id};
        onAuthorUpdate(newAuthor);
        setNewAuthorName(null);
    }

    return(
        <Modal show={showUpdateValidation} onHide={onUpdateValidationClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='pl-1'>Name of Author</Form.Label>
                    <Form.Control
                        type="text"
                        spellCheck="false"
                        autoComplete="off"
                        value={newAuthorName ? newAuthorName : ''}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleNewAuthorNameChange(e.target.value)}
                    />
                </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onUpdateValidationClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onUpdateValidationClose} type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default UpdateValidationAuthor;