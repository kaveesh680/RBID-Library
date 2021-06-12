import React, {FormEvent, useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";
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
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);

    const handleNewAuthorNameChange = (newName:string) => {
        setNewAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(newAuthorName === '' || newAuthorName === null){
            setIsFormValidate(true);
            return;
        }

        const newAuthor:IAuthor = {name:newAuthorName,id:id};
        onAuthorUpdate(newAuthor);
        onUpdateValidationClose();
    }

    return(
        <Modal show={showUpdateValidation} onHide={onUpdateValidationClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} validated={isFormValidate} noValidate>
                    <Form.Group className="mb-3" >
                        <Form.Label className='pl-1'>Name of Author</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            spellCheck="false"
                            autoComplete="off"
                            value={newAuthorName ? newAuthorName : ''}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                handleNewAuthorNameChange(e.target.value)}
                        />
                        <FormControl.Feedback type="invalid">
                            <p className="font-weight-bold">Please enter author name</p>
                        </FormControl.Feedback>
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