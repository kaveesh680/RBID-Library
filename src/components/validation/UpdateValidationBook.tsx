import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, FormControl, Modal, Row} from "react-bootstrap";
import {IAuthor, IBook, IBookDetails, ILabelOption} from "../../types/LibraryTypes";
import Select, {ValueType} from "react-select";

type UpdateValidationBookProps = {
    onUpdateValidationClose:() => void
    showUpdateValidation:boolean
    authors:IAuthor[] | null
    onBookUpdate:(book:IBook) => void
    bookDetails:IBookDetails
    id:string
}

const UpdateValidationBook:React.FC<UpdateValidationBookProps> = (props) => {

    const {onUpdateValidationClose, showUpdateValidation, id, authors, onBookUpdate, bookDetails} = props;

    const [newBookName, setNewBookName] = useState<string | null>(bookDetails.name);
    const [newAuthor, setNewAuthor] = useState<IAuthor | null>(bookDetails.author);
    const [newIsbn, setNewIsbn] = useState<string | null>(bookDetails.isbn);
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

    const handleOnIsbnChange = (isbn: string) => {
        setNewIsbn(isbn);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        (newAuthor === null) ? setSelectorBorderColor('#f80046') : setSelectorBorderColor('#6AB867');
        if(!newBookName || !newIsbn || newBookName === '' || newIsbn === '' || !newAuthor){
            setIsFormValidate(true);
            setIsSelectorValidate(true);
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
        onUpdateValidationClose();
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
        <Modal show={showUpdateValidation} onHide={onUpdateValidationClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}  validated={isFormValidate} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label className='pl-1'>Title of the Book</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            spellCheck="false"
                            autoComplete="off"
                            value={newBookName ? newBookName : ''}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                                handleNewBookNameChange(e.target.value)}
                        />
                        <FormControl.Feedback type="invalid">
                            <p className="font-weight-bold">Please enter book title</p>
                        </FormControl.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='pl-1'>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={newIsbn ? newIsbn : ''}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleOnIsbnChange(e.target.value)}
                        />
                        <FormControl.Feedback type="invalid">
                            <p className="font-weight-bold">Please enter isbn</p>
                        </FormControl.Feedback>
                    </Form.Group>
                    <Row>
                        <Col xs={12} className="mb-3">
                            <Form.Label className='pl-1'>Author</Form.Label>
                            <Select
                                    options={selectOptions}
                                    isClearable={true}
                                    styles={customStyles}
                                    isSearchable={true}
                                    onChange={(option:ValueType<ILabelOption, false>) => handleOnAuthorChange(option)}/>
                            {selectorBorderColor === '#f80046' &&
                            <small className="text-danger font-weight-bold mb-5">Please select author</small>}
                        </Col>
                    </Row>

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

export default UpdateValidationBook;