import React from 'react';
import {Plus} from "react-feather";

const AddAuthor:React.FC = () => {
    return(
        <p>
            <Plus className='mr-2' size={25} color="#144500"/>
            Add author
        </p>
    )
}

export default AddAuthor;