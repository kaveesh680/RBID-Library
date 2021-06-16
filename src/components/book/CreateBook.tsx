import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import Select, {ValueType} from 'react-select';
import {IAuthor, IBook, ILabelOption} from "../../types/LibraryTypes";
import { v4 as uuid4 } from 'uuid';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CreateBookProps = {
    onFormClose:() => void
    authors:IAuthor[] | null
    onBookAdded:(book:IBook) => void
}
toast.configure();
const CreateBook:React.FC<CreateBookProps> = (props) => {

    const {onFormClose, authors, onBookAdded} = props;

    const [bookName, setBookName] = useState<string | null>(null);
    const [author, setAuthor] = useState<IAuthor | null>(null);
    const [isbn, setIsbn] = useState<string | null>(null);
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);
    const [selectorBorderColor, setSelectorBorderColor] = useState<string>('#959595');
    const [isSelectorValidate, setIsSelectorValidate] = useState<boolean>(false);

    const notify = () => toast.success("Book Successfully Added!",{
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar:true
    });

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
        notify();
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
            <Col xs={12} xl={9} className='px-4 book-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Create Book</h3>
                    </Col>
                    <Col xs={2} className='mt-1 text-md-center text-right' onClick={onFormClose}>
                        <XCircle />
                    </Col>
                </Row>
                <Row>
                    <Col md={{span:11,offset:1}} xs={12} className='pl-md-1'>
                        <Form onSubmit={handleSubmit} validated={isFormValidate} noValidate>
                            <Form.Group className="mb-3 pr-md-3" controlId="formBasicEmail">
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
                                    <p className="font-weight-bold validation">Please enter book title</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 pr-md-3">
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
                                    <p className="font-weight-bold validation">Please enter isbn</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Row>
                                <Col xs={12}>
                                    <Form.Label className='pl-1'>Author</Form.Label>
                                    <Select className='pr-md-3 mb-0'
                                            options={selectOptions}
                                            isClearable
                                            isSearchable
                                            styles={customStyles}
                                            onChange={(option:ValueType<ILabelOption, false>) =>
                                                handleOnAuthorChange(option)}/>
                                    {selectorBorderColor === '#f80046' &&
                                    <small className="text-danger font-weight-bold validation-small">Please select author</small>}
                                </Col>
                            </Row>

                            <Button
                                variant="primary"
                                className='px-4 py-1 mr-md-3 float-right mt-3'
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