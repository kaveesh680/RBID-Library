import React from 'react';
import {Col, Row} from "react-bootstrap";

const AuthorTitle:React.FC = () => {
    return(
        <Row>
            <Col className='px-4 pb-4'>
                <h2 className='pb-2'>Authors</h2>
            </Col>
        </Row>

    )
}

export default AuthorTitle;