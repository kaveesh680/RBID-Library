import React from 'react';
import {Edit, Trash2} from "react-feather";

const Author:React.FC = () => {
    return(
        <li className='align-baseline pt-2 pb-3'>3. Author 1 name
            <Trash2 className='float-right pt-1 icons mx-3' size={30} color="red"/>
            <Edit className='float-right pt-1 icons' size={30} color="green"/>
        </li>
    )
}

export default Author;