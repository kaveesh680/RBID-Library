import React, {useState} from 'react';
import {Edit, Trash2} from "react-feather";
import {IAuthor, IBook} from "../../types/LibraryTypes";
import DeleteValidationAuthor from "../validation/DeleteValidationAuthor";
import UpdateValidationAuthor from "../validation/UpdateValidationAuthor";

type AuthorProps = {
    num:number
    author:IAuthor,
    books:IBook[] | null
    id:string
    onAuthorDelete:(id:string) => void
    onAuthorUpdate:(author:IAuthor) => void
}

const Author:React.FC<AuthorProps> = (props) => {

    const {author, num, id, onAuthorDelete, onAuthorUpdate, books} = props;

    const [showDeleteValidation, setShowDeleteValidation] = useState<boolean>(false);
    const [showUpdateValidation, setShowUpdateValidation] = useState<boolean>(false);
    const [isAssignToABook, setIsAssignToABook] = useState<boolean>(false);
    const [assignBookNames, setAssignBookNames] = useState<string[] | null>(null);

    const handleOnDeleteValidationClose = () => setShowDeleteValidation(false);

    const handleOnDeleteValidationShow = () => {

        setShowDeleteValidation(true);

        if(!books || books === []){
            setIsAssignToABook(false);
            return;
        }
        let count:number = 0;
        const assignBooks:string[] = [];
        books.forEach((book:IBook) => {
            if(book.details.author.id === id){
                setIsAssignToABook(true);
                count +=1;
                assignBooks.push(book.details.name)
            }
        });
        if(count === 0){
            setIsAssignToABook(false);
        }else{
            setAssignBookNames(assignBooks);
        }
    }


    const handleOnUpdateValidationClose = () => setShowUpdateValidation(false);
    const handleOnUpdateValidationShow = () => setShowUpdateValidation(true);

    return(
        <>
            <li className='align-baseline pt-2 pb-3'>{num}. {author.name}
                <Trash2 className='float-right pt-1 icons mx-3'
                        size={30}
                        color="red"
                        onClick={handleOnDeleteValidationShow}
                />
                <Edit className='float-right pt-1 icons'
                      size={30}
                      color="rgb(221, 211, 24)"
                      onClick={handleOnUpdateValidationShow}
                />
            </li>
            {showDeleteValidation && <DeleteValidationAuthor
                onDeleteValidationClose={handleOnDeleteValidationClose}
                showDeleteValidation={showDeleteValidation}
                onDelete={() => onAuthorDelete(id)}
                isAssignToABook={isAssignToABook ? isAssignToABook:false}
                author={author.name ? author.name:''}
                assignBooks={assignBookNames ? assignBookNames : []}
            />}

            {showUpdateValidation && <UpdateValidationAuthor
                onUpdateValidationClose={handleOnUpdateValidationClose}
                showUpdateValidation={showUpdateValidation}
                onAuthorUpdate={onAuthorUpdate}
                author={author.name}
                id={id}
            />}

        </>

    )
}

export default Author;