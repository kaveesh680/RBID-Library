import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
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
    const [showValidateText,setShowValidateText] = useState<boolean>(false);

    const handleNewBookNameChange = (newName:string) => {
        setNewBookName(newName);
    }

    const handleOnAuthorChange = (option:ValueType<ILabelOption, false>) => {
        if(!option){
            return;
        }
        const bookAuthor:IAuthor = {name:option.label, id:option.id}
        setNewAuthor(bookAuthor);

    }

    const handleOnIsbnChange = (isbn: string) => {
        setNewIsbn(isbn);
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!newBookName){
            setShowValidateText(true);
            return;
        }
        if(!newIsbn){
            setShowValidateText(true);
            return;
        }

        if(!newAuthor){
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
        <Modal show={showUpdateValidation} onHide={onUpdateValidationClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='pl-1'>Title of the Book</Form.Label>
                    <Form.Control
                        type="text"
                        spellCheck="false"
                        autoComplete="off"
                        placeholder= {showValidateText ? "Enter Title Name": ''}
                        value={newBookName ? newBookName : ''}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleNewBookNameChange(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='pl-1'>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            value={newIsbn ? newIsbn : ''}
                            placeholder= {showValidateText ? "Enter ISBN": ''}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleOnIsbnChange(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col xs={12} className=''>
                            <Form.Label className='pl-1'>Author {(showValidateText && !newAuthor) ? "Enter Title Name": ''}</Form.Label>
                            <Select className='mb-5'
                                    options={selectOptions}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={(option:ValueType<ILabelOption, false>) => handleOnAuthorChange(option)}/>
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