import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {IAuthor, IBook, IBookDetails, ILabelOption} from "../../types/LibraryTypes";
import Select, {ValueType} from "react-select";
import {XCircle} from "react-feather";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyInput from "react-currency-input-field";


type UpdateBookProps = {
    onFormClose:() => void
    authors:IAuthor[] | null
    bookDetails:IBookDetails
    onBookUpdate:(book:IBook) => void
    id:string | null
}

const UpdateBook:React.FC<UpdateBookProps> = (props) => {

    const {onFormClose, authors, onBookUpdate, id, bookDetails} = props;

    const [selectOptions, setSelectOptions] = useState<ILabelOption[]>([]);
    const [newBookName, setNewBookName] = useState<string | null>(bookDetails.name);
    const [newAuthor, setNewAuthor] = useState<IAuthor | null>(bookDetails.author);
    const [newIsbn, setNewIsbn] = useState<string | null>(bookDetails.isbn);
    const [isFormValidate,setIsFormValidate] = useState<boolean>(false);
    const [selectorBorderColor, setSelectorBorderColor] = useState<string>('#959595');
    const [isSelectorValidate, setIsSelectorValidate] = useState<boolean>(false);

    const notify = () => toast.success("Book Successfully Updated!",{
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

    const handleNewBookNameChange = (newName:string) => {
        setNewBookName(newName);
    }

    const handleOnAuthorChange = (option:ValueType<ILabelOption, false>) => {
        if (option) {
            const bookAuthor:IAuthor = {name:option.label, id:option.id}
            setNewAuthor(bookAuthor);
            if (isSelectorValidate) {
                setSelectorBorderColor('#6AB867');
            }
        } else {
            setNewAuthor(null);
            if (isSelectorValidate) {
                setSelectorBorderColor('#f80046');
            }
        }
    }

    const handleOnIsbnChange = (isbn: string | undefined) => {
        if(isbn !== undefined){
            setNewIsbn(isbn);
        }
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        (newAuthor === null) ? setSelectorBorderColor('#f80046') : setSelectorBorderColor('#6AB867');
        if(!newBookName || !newIsbn || newBookName === '' || !newAuthor){
            setIsFormValidate(true);
            setIsSelectorValidate(true);
            return;
        }
        if(newBookName === bookDetails.name && newIsbn === bookDetails.isbn && newAuthor ===bookDetails.author){
            return;
        }

        if(!id){
            return;
        }

        const newBook:IBook = {
            id:id,
            details:{
                name:newBookName,
                author:{
                    id:newAuthor.id,
                    name:newAuthor.name
                },
                isbn:newIsbn
            }
        }
        onBookUpdate(newBook);
        onFormClose();
        notify();
    }

    useEffect(() => {

        if (authors) {
            const options: ILabelOption[] = authors.map(author => {
                return {
                    id: author.id,
                    label: author.name
                };
            });
            setSelectOptions(options);
        }
    }, [authors]);



    return(
        <Row className='mt-5'>
            <Col xs={12} xl={9} className='px-4 book-form'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h3>Update Book</h3>
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
                                    value={newBookName ? newBookName :''}
                                    spellCheck="false"
                                    autoComplete="off"
                                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) =>
                                        handleNewBookNameChange(e.target.value)}/>
                                <FormControl.Feedback type="invalid">
                                    <p className="font-weight-bold validation">Please enter book title</p>
                                </FormControl.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 pr-md-3">
                                <Form.Label className='pl-1'>ISBN</Form.Label>
                                {/*<Form.Control*/}
                                {/*    type="text"*/}
                                {/*    required*/}
                                {/*    value={newIsbn ? newIsbn : ''}*/}
                                {/*    spellCheck="false"*/}
                                {/*    autoComplete="off"*/}
                                {/*    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>*/}
                                {/*        handleOnIsbnChange(e.target.value)}*/}
                                {/*/>*/}
                                <CurrencyInput className='form-control'
                                               id="input-example"
                                               name="input-name"
                                               required
                                               decimalSeparator="."
                                               autoComplete="none"
                                               defaultValue={newIsbn ? newIsbn : ''}
                                               decimalScale={2}
                                               intlConfig={{ locale: 'en-US', currency: 'USD' }}
                                               decimalsLimit={2}
                                               onValueChange={(value: string | undefined) => handleOnIsbnChange(value)}
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
                                            defaultValue={{
                                                label:(newAuthor ? newAuthor.name: ''),
                                                id:newAuthor?newAuthor.id:''
                                            }}
                                            styles={customStyles}
                                            onChange={(option:ValueType<ILabelOption, false>) =>
                                                handleOnAuthorChange(option)}/>
                                    {selectorBorderColor === '#f80046' &&
                                    <small className="text-danger font-weight-bold validation">Please select author</small>}
                                </Col>
                            </Row>

                            <Button
                                variant="primary"
                                className='px-4 py-1 mr-md-3 float-right mt-3'
                                type="submit">Update
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default UpdateBook;