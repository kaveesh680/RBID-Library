import React, {useState} from 'react';
import {Edit, Trash2} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";
import DeleteValidation from "../validation/DeleteValidation";
import UpdateValidationAuthor from "../validation/UpdateValidationAuthor";

type AuthorProps = {
    num:number
    author:IAuthor,
    id:string
    onAuthorDelete:(id:string) => void
    onAuthorUpdate:(author:IAuthor) => void
}

const Author:React.FC<AuthorProps> = (props) => {

    const [showDeleteValidation, setShowDeleteValidation] = useState(false);
    const [showUpdateValidation, setShowUpdateValidation] = useState(false);

    const handleOnDeleteValidationClose = () => setShowDeleteValidation(false);
    const handleOnDeleteValidationShow = () => setShowDeleteValidation(true);

    const handleOnUpdateValidationClose = () => setShowUpdateValidation(false);
    const handleOnUpdateValidationShow = () => setShowUpdateValidation(true);

    const {author, num, id, onAuthorDelete, onAuthorUpdate} = props;

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
                      color="green"
                      onClick={handleOnUpdateValidationShow}
                />
            </li>
            <DeleteValidation
                onDeleteValidationClose={handleOnDeleteValidationClose}
                showDeleteValidation={showDeleteValidation}
                onDelete={() => onAuthorDelete(id)}
            />
            <UpdateValidationAuthor
                onUpdateValidationClose={handleOnUpdateValidationClose}
                showUpdateValidation={showUpdateValidation}
                onAuthorUpdate={onAuthorUpdate}
                id={id}
            />
        </>

    )
}

export default Author;