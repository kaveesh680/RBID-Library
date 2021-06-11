import React, {FormEvent, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {IAuthor} from "../../types/LibraryTypes";

type UpdateValidationProps = {
    onUpdateValidationClose:() => void
    showUpdateValidation:boolean
    onAuthorUpdate:(author:IAuthor) => void
    author:string
    id:string
}

const UpdateValidationAuthor:React.FC<UpdateValidationProps> = (props) => {

    const {onUpdateValidationClose, showUpdateValidation, onAuthorUpdate, id, author} = props;

    const [newAuthorName, setNewAuthorName] = useState<string | null>(author);
    const [showValidateText,setShowValidateText] = useState<boolean>(false);

    const handleNewAuthorNameChange = (newName:string) => {
        setNewAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!newAuthorName){
            setShowValidateText(true);
            return;
        }

        const newAuthor:IAuthor = {name:newAuthorName,id:id};
        onAuthorUpdate(newAuthor);
        onUpdateValidationClose();
        setShowValidateText(false);
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
                        placeholder= {(showValidateText && !newAuthorName) ? "Enter Author": ''}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleNewAuthorNameChange(e.target.value)}
                    />
                </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onUpdateValidationClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default UpdateValidationAuthor;