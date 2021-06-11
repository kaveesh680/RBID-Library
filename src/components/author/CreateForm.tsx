import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";
import { v4 as uuid4 } from 'uuid';

type CreateFormProps = {
    onFormClose: () => void
    onAuthorAdded:(author:IAuthor) => void
}

const CreateForm:React.FC<CreateFormProps> = (props) => {

    const {onFormClose, onAuthorAdded} = props;

    const [authorName, setAuthorName] = useState<string | null>(null);
    const [showValidateText,setShowValidateText] = useState<boolean>(false);

    const handleAuthorNameChange = (newName:string) => {
        setAuthorName(newName);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!authorName){
            setShowValidateText(true);
            return;
        }

        const newAuthor: IAuthor = {name:authorName,id:uuid4()};
        onAuthorAdded(newAuthor);
        onFormClose();
        setShowValidateText(false);
    }

    return(
        <Row className='mt-5'>
            <Col md={9} className='px-4 author-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Author</h3>
                    </Col>
                    <Col xs={2} className='text-center mt-1' onClick={onFormClose}>
                        <XCircle />
                    </Col>

                </Row>

                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Name of Author</Form.Label>
                                <Form.Control type="text"
                                              spellCheck="false"
                                              autoComplete="off"
                                              value={authorName ? authorName : ''}
                                              placeholder= {(showValidateText && !authorName) ? "Enter Author": ''}
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                                  handleAuthorNameChange(e.target.value)}/>
                            </Form.Group>
                            <Button className='px-4 py-1 mr-3 float-right'
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