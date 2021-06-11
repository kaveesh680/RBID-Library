import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import Select, {ValueType} from 'react-select';
import {IAuthor, IBook, ILabelOption} from "../../types/LibraryTypes";
import { v4 as uuid4 } from 'uuid';

type CreateBookProps = {
    onFormClose:() => void
    authors:IAuthor[] | null
    onBookAdded:(book:IBook) => void
}

const CreateBook:React.FC<CreateBookProps> = (props) => {

    const {onFormClose, authors, onBookAdded} = props;

    const [bookName, setBookName] = useState<string | null>(null);
    const [author, setAuthor] = useState<IAuthor | null>(null);
    const [isbn, setIsbn] = useState<string | null>(null);
    const [showValidateText,setShowValidateText] = useState<boolean>(false);

    const handleOnBookNameChange = (newName:string) => {
        setBookName(newName);
    }

    const handleOnAuthorChange = (option:ValueType<ILabelOption, false>) => {
        if(!option){
            return;
        }
        const bookAuthor:IAuthor = {name:option.label, id:option.id}
        setAuthor(bookAuthor);

    }

    const handleOnIsbnChange = (isbn: string) => {
        setIsbn(isbn);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!bookName){
            setShowValidateText(true);
            return;
        }
        if(!isbn){
            setShowValidateText(true);
            return;
        }

        if(!author){
            return;
        }

        const newBook:IBook = {id:uuid4(),details:{name:bookName, author:{id:author.id,name:author.name},isbn:isbn}}
        onBookAdded(newBook);
        onFormClose();
        setShowValidateText(false);
    }


    let selectOptions;
    if(authors){
        selectOptions = authors.map(author => {
            return {
                id: author.id,
                label: author.name
            };
        });
    }

    return(
        <Row className='mt-5'>
            <Col md={9} className='px-4 book-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Book</h3>
                    </Col>
                    <Col xs={2} className='text-center mt-1' onClick={onFormClose}>
                        <XCircle />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:11,offset:1}} className='pl-1'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Title of the Book</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bookName ? bookName :''}
                                    spellCheck="false"
                                    autoComplete="off"
                                    placeholder= {(showValidateText && !bookName) ? "Enter Title Name": ''}
                                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnBookNameChange(e.target.value)}/>

                            </Form.Group>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>ISBN</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={isbn ? isbn : ''}
                                    spellCheck="false"
                                    autoComplete="off"
                                    placeholder= {(showValidateText && !isbn) ? "Enter ISBN": ''}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleOnIsbnChange(e.target.value)}
                                />
                            </Form.Group>
                            <Row>
                                <Col xs={12} className=''>
                                    <Form.Label className='pl-1'>Author</Form.Label>
                                    <Select className='pr-3 mb-3'
                                            options={selectOptions}
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={(option:ValueType<ILabelOption, false>) => handleOnAuthorChange(option)}/>
                                </Col>
                            </Row>
                            <Button variant="primary" className='px-4 py-1 mr-3 float-right' type="submit">Create</Button>
                        </Form>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default CreateBook;