import React from 'react';
import {Plus} from "react-feather";
import {Col, Row} from "react-bootstrap";

type AddAuthorProps = {
    onAddClick: () => void
}

const AddAuthor:React.FC<AddAuthorProps> = (props) => {
    return(
        <Row>
            <Col className='px-4 add' onClick={props.onAddClick}>
                <p>
                    <Plus className='mr-2' size={25} color="#144500"/>
                        Add Author
                </p>
            </Col>
        </Row>
    )
}

export default AddAuthor;