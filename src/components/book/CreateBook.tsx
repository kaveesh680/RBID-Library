import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
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
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);
    const [selectorBorderColor, setSelectorBorderColor] = useState<string>('#959595');
    const [isSelectorValidate, setIsSelectorValidate] = useState<boolean>(false);

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            border: `2px solid ${selectorBorderColor}`,
            borderRadius: '0px'
        }),
    }

    const handleOnBookNameChange = (newName:string) => {
        setBookName(newName);
    }

    const handleOnAuthorChange = (option:ValueType<ILabelOption, false>) => {
        if (option) {
            const bookAuthor:IAuthor = {name:option.label, id:option.id}
            setAuthor(bookAuthor);
            if (isSelectorValidate) {
                setSelectorBorderColor('#6AB867');
            }
        } else {
            setAuthor(null);
            if (isSelectorValidate) {
                setSelectorBorderColor('#f80046');
            }
        }
    }

    const handleOnIsbnChange = (isbn: string) => {
        setIsbn(isbn);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        (author === null) ? setSelectorBorderColor('#f80046') : setSelectorBorderColor('#6AB867');
        if(!bookName || !isbn || bookName === '' || isbn === '' || !author){
            setIsFormValidate(true);
            setIsSelectorValidate(true);
            return;
        }

        const newBook:IBook = {
            id:uuid4(),
            details:{
                name:bookName,
                author:{
                    id:author.id,
                    name:author.name
                },
                isbn:isbn
            }
        }
        onBookAdded(newBook);
        onFormClose();
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
                        <Form onSubmit={handleSubmit} validated={isFormValidate} noValidate>
                            <Form.Group className="mb-3 pr-3" controlId="formBasicEmail">
                                <Form.Label className='pl-1'>Title of the Book</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={bookName ? bookName :''}
                                    spellCheck="false"
                                    autoComplete="off"
                                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnBookNameChange(e.target.value)}/>
                                <FormControl.Feedback type="invalid">
                                    <p className="font-weight-bold">Please enter book title</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 pr-3">
                                <Form.Label className='pl-1'>ISBN</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={isbn ? isbn : ''}
                                    spellCheck="false"
                                    autoComplete="off"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnIsbnChange(e.target.value)}
                                />
                                <FormControl.Feedback type="invalid">
                                    <p className="font-weight-bold">Please enter isbn</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Row>
                                <Col xs={12} className=''>
                                    <Form.Label className='pl-1'>Author</Form.Label>
                                    <Select className='pr-3 mb-3'
                                            options={selectOptions}
                                            isClearable
                                            isSearchable
                                            styles={customStyles}
                                            onChange={(option:ValueType<ILabelOption, false>) =>
                                                handleOnAuthorChange(option)}/>
                                </Col>
                            </Row>
                            {selectorBorderColor === '#f80046' &&
                            <small className="text-danger font-weight-bold">Please select author</small>}
                            <Button
                                variant="primary"
                                className='px-4 py-1 mr-3 float-right'
                                type="submit">Create
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default CreateBook;