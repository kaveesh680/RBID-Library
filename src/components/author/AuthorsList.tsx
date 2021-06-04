import React, {useState} from 'react';
import Author from "./Author";
import {Col, Row} from "react-bootstrap";

const AuthorsList:React.FC = () => {

    const [isEmpty, setIsEmpty] = useState(true);

    if(isEmpty){
        return <label className='font-italic ml-2 mb-3 empty-label'>No authors listed here.</label>
    }

    return(
        <Row>
            <Col className='px-4'>
                <ul className='list-unstyled'>
                    <Author />
                    <Author />
                    <Author />
                    <Author />
                    <Author />
                </ul>
            </Col>
        </Row>
    )
}

export default AuthorsList;