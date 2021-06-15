import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {IAuthor} from "../../types/LibraryTypes";
import {XCircle} from "react-feather";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type UpdateAuthorProps = {
    onFormClose:() => void
    onAuthorUpdate:(author:IAuthor) => void
    author:string | null
    id:string | null
}

const UpdateAuthor:React.FC<UpdateAuthorProps> = (props) => {

    const {onFormClose, onAuthorUpdate, id, author} = props;

    const [newAuthorName, setNewAuthorName] = useState<string | null>(author);
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);

    const notify = () => toast.success("Author Successfully Updated!",{
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar:true
    });

    const handleNewAuthorNameChange = (newName:string) => {
        setNewAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(newAuthorName === '' || newAuthorName === null){
            setIsFormValidate(true);
            return;
        }
        if(!id || author === newAuthorName){
            return;
        }

        const newAuthor:IAuthor = {name:newAuthorName,id:id};
        onAuthorUpdate(newAuthor);
        onFormClose();
        notify();
    }

    return(
        <Row className='mt-5'>
            <Col md={9} className='px-4 author-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Update Author</h3>
                    </Col>
                    <Col xs={2} className='text-center mt-1' onClick={onFormClose}>
                        <XCircle />
                    </Col>

                </Row>

                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form onSubmit={handleSubmit} validated={isFormValidate} noValidate>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Name of Author</Form.Label>
                                <Form.Control type="text"
                                              required
                                              spellCheck="false"
                                              autoComplete="off"
                                              value={newAuthorName ? newAuthorName : ''}
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                                  handleNewAuthorNameChange(e.target.value)}/>
                                <FormControl.Feedback type="invalid">
                                    <p className="font-weight-bold">Please enter author name</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Button className='px-4 py-1 mr-3 float-right'
                                    variant="primary"
                                    type="submit"
                            >
                                Update
                            </Button>

                        </Form>

                    </Col>
                </Row>

            </Col>
        </Row>

    )
}

export default UpdateAuthor;