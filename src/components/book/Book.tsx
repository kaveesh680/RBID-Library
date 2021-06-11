import React, {useState} from 'react';
import {Edit, Trash2} from "react-feather";
import {IAuthor, IBook, IBookDetails} from "../../types/LibraryTypes";
import DeleteValidationBook from "../validation/DeleteValidationBook";
import UpdateValidationBook from "../validation/UpdateValidationBook";

type BookProps = {
    id:string
    num:number
    bookDetails:IBookDetails
    onBookDelete:(id:string) => void
    authors:IAuthor[] | null
    onBookUpdate:(book:IBook) => void
}

const Book:React.FC<BookProps> = (props) => {

    const {id, num, bookDetails, onBookDelete, authors, onBookUpdate} = props;

    const [showDeleteValidation, setShowDeleteValidation] = useState(false);
    const [showUpdateValidation, setShowUpdateValidation] = useState(false);

    const handleOnDeleteValidationClose = () => setShowDeleteValidation(false);
    const handleOnDeleteValidationShow = () => setShowDeleteValidation(true);

    const handleOnUpdateValidationClose = () => setShowUpdateValidation(false);
    const handleOnUpdateValidationShow = () => setShowUpdateValidation(true);

    return(
        <>
            <li className='align-baseline pt-2 pb-3'>{num}. {bookDetails.name}
                <Trash2
                    className='float-right pt-1 icons mx-3'
                    size={30}
                    color="red"
                    onClick={handleOnDeleteValidationShow}
                />

                <Edit
                    className='float-right pt-1 icons'
                    size={30}
                    color="green"
                    onClick={handleOnUpdateValidationShow}
                />

            </li>

            {showDeleteValidation && <DeleteValidationBook
                onDeleteValidationClose={handleOnDeleteValidationClose}
                showDeleteValidation={showDeleteValidation}
                onDelete={() => onBookDelete(id)}
            />}

            {showUpdateValidation && <UpdateValidationBook
                onUpdateValidationClose={handleOnUpdateValidationClose}
                showUpdateValidation={showUpdateValidation}
                onBookUpdate={onBookUpdate}
                id={id}
                authors={authors}
                bookDetails={bookDetails}
            />}

        </>
    )
}

export default Book;