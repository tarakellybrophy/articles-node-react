import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { AuthContext } from '../App';

const Header = () => {
    const { state, dispatch } = React.useContext(AuthContext);
    const user = state.user;

    let history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        history.push("/");
        dispatch({type: "LOGOUT"});
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Articles</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {user === null &&
                <Nav.Item className="ml-auto">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav.Item>}

                {user === null &&
                <Nav.Item>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav.Item>}
                
                {user !== null &&
                <Nav.Item>
                    <Nav.Link as={Link} to="/articles">Home</Nav.Link>
                </Nav.Item>}

                {user !== null &&
                <Nav.Item className="ml-auto">
                    <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
                </Nav.Item>}
            </Navbar.Collapse>
      </Navbar>
    );
};

export default Header;