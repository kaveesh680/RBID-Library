import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import Select from 'react-select';

type CreateBookProps = {
    onFormClose:() => void
}

const CreateBook:React.FC<CreateBookProps> = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return(
        <Row className='mt-5'>
            <Col md={9} className='px-4 book-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Book</h3>
                    </Col>
                    <Col xs={2} className='text-center mt-1' onClick={props.onFormClose}>
                        <XCircle />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Title of the Book</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>ISBN</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form.Label className='pl-1'>Author</Form.Label>
                        <Select className='pr-3 mb-3' options={options} isClearable={true}/>
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

export default CreateBook;