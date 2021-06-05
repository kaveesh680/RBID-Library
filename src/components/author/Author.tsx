import React from 'react';
import {Edit, Trash2} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";

type AuthorProps = {
    num:number
    author:IAuthor,
    id:string
    onAuthorDelete:(id:string) => void
}

const Author:React.FC<AuthorProps> = (props) => {

    const {author, num, id, onAuthorDelete} = props;

    return(
        <li className='align-baseline pt-2 pb-3'>{num}. {author.name}
            <Trash2 className='float-right pt-1 icons mx-3' size={30} color="red" onClick={() => onAuthorDelete(id)}/>
            <Edit className='float-right pt-1 icons' size={30} color="green"/>
        </li>
    )
}

export default Author;