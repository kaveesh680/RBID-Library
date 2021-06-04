import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";

type CreateFormProps = {
    onFormClose: () => void
}

const CreateForm:React.FC<CreateFormProps> = (props) => {
    return(
        <Row className='mt-5'>
            <Col md={9} className='px-4 author-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Author</h3>
                    </Col>
                    <Col xs={2} className='text-center mt-1' onClick={props.onFormClose}>
                        <XCircle />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Name of Author</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className='mr-1'>
                    <Col xs={{span:3,offset:9}}>
                        <Button variant="primary" className='px-4 py-1 float-right'>Create</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CreateForm;