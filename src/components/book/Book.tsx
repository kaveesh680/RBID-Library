import React, {useState} from 'react';
import {Edit, Trash2} from "react-feather";
import {IAuthor, IBook, IBookDetails} from "../../types/LibraryTypes";
import DeleteValidationBook from "../validation/DeleteValidationBook";

type BookProps = {
    id:string
    num:number
    bookDetails:IBookDetails
    onBookDelete:(id:string) => void
    authors:IAuthor[] | null
    onBookUpdate:(book:IBook) => void
    onEditButtonClicked:(bookDetails:IBookDetails,id:string) => void
}

const Book:React.FC<BookProps> = (props) => {

    const {id, num, bookDetails, onBookDelete, onEditButtonClicked} = props;

    const [showDeleteValidation, setShowDeleteValidation] = useState<boolean>(false);
    // const [showUpdateValidation, setShowUpdateValidation] = useState<boolean>(false);

    const handleOnDeleteValidationClose = () => setShowDeleteValidation(false);
    const handleOnDeleteValidationShow = () => setShowDeleteValidation(true);

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
                    color="rgb(221, 211, 24)"
                    onClick={() => onEditButtonClicked(bookDetails,id)}
                />

            </li>

            {showDeleteValidation && <DeleteValidationBook
                onDeleteValidationClose={handleOnDeleteValidationClose}
                showDeleteValidation={showDeleteValidation}
                onDelete={() => onBookDelete(id)}
            />}

        </>
    )
}

export default Book;