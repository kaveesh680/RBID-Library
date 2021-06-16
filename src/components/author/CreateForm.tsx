import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";
import { v4 as uuid4 } from 'uuid';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CreateFormProps = {
    onFormClose: () => void
    onAuthorAdded:(author:IAuthor) => void
}

const CreateForm:React.FC<CreateFormProps> = (props) => {

    const {onFormClose, onAuthorAdded} = props;

    const [authorName, setAuthorName] = useState<string | null>(null);
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);

    const notify = () => toast.success("Author Successfully Added!",{
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar:true
    });

    const handleAuthorNameChange = (newName:string) => {
        setAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(authorName === '' || authorName === null){
            setIsFormValidate(true);
            return;
        }

        const newAuthor: IAuthor = {name:authorName,id:uuid4()};
        onAuthorAdded(newAuthor);
        onFormClose();
        notify();
    }

    return(
        <Row className='mt-5'>
            <Col xs={12} xl={9} className='px-4 author-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Author</h3>
                    </Col>
                    <Col xs={2} className='mt-1 text-md-center text-right' onClick={onFormClose}>
                        <XCircle />
                    </Col>

                </Row>

                <Row>
                    <Col md={{span:11,offset:1}} xs={12} className='pl-md-1'>
                        <Form onSubmit={handleSubmit} validated={isFormValidate} noValidate>
                            <Form.Group className="mb-3 pr-md-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Name of Author</Form.Label>
                                <Form.Control type="text"
                                              required
                                              spellCheck="false"
                                              autoComplete="off"
                                              value={authorName ? authorName : ''}
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                                  handleAuthorNameChange(e.target.value)}/>
                                <FormControl.Feedback type="invalid">
                                    <p className="font-weight-bold validation">Please enter author name</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Button className='px-4 py-1 mr-md-3 float-right'
                                    variant="primary"
                                    type="submit"
                            >
                                Create
                            </Button>
                        </Form>

                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default CreateForm;