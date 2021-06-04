import React from 'react';
import {Edit, Trash2} from "react-feather";

const Book:React.FC = () => {
    return(
        <li className='align-baseline pt-2 pb-3'>3. Book 1 title
            <Trash2 className='float-right pt-1 icons mx-3' size={30} color="red"/>
            <Edit className='float-right pt-1 icons' size={30} color="green"/>
        </li>
    )
}

export default Book;