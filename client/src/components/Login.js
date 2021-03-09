import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../App';

const Login = () => {

    const { state, dispatch } = React.useContext(AuthContext);

    let history = useHistory();

    const initialState = {
        username: "Bruce16",
        password: "secret",
        remember: false,
        isSubmitting: false,
        errorMessage: null
    };

    const [data, setData] = React.useState(initialState);

    const handleChange = (e) => {
        const target = e.target;
        const field = target.name;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        setData({
            ...data,
            [field]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });

        const userDetails = {
            username: data.username,
            password: data.password
        };

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(response => {
            if (!response.success) {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: response.msg
                });
            }
            else {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        user: response.user,
                        token: response.token
                    }
                });
                history.push("/articles");
            }
        })
        .catch(error => {
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: error.message || error.statusText
            });
        });
    }

    if (state.isAuthenticated) {
        return <Redirect to="/home" />
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Login form</Card.Title>
                <Form onSubmit={handleSubmit}>
                    {data.errorMessage &&
                        <Alert variant="danger">
                            {data.errorMessage}
                        </Alert>
                    }
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            required 
                            name="username"
                            type="username" 
                            value={data.username}
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            name="password"
                            type="password" 
                            value={data.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="remember">
                        <Form.Check
                            type="checkbox" 
                            name="remember" 
                            label="Remember me" 
                            checked={data.remember}
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={data.isSubmitting}>
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );  
}

export default Login;
