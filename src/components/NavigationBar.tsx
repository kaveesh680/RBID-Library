import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

const NavigationBar:React.FC = () =>{

    let history = useHistory();

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => history.push('/')}>My Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link onClick={() => history.push('/about')}>About</Nav.Link>
                        {/*<NavLink to="/about" >About</NavLink>*/}
                        <Nav.Link onClick={() => history.push('/contact')}>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export  default NavigationBar;