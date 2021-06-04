import React from 'react';
import Author from "./Author";

const AuthorsList:React.FC = () => {
    return(
        <ul className='list-unstyled'>
            <Author />
            <Author />
            <Author />
            <Author />
            <Author />
        </ul>
    )
}

export default AuthorsList;