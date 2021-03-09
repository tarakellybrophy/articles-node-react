import React from 'react';
import { Redirect } from 'react-router-dom';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { ArticlesContext } from '../Home';

const Edit = () => {
    
    const { id } = useParams();
    const { state: authState } = React.useContext(AuthContext);
    const { articles } = React.useContext(ArticlesContext);
    const { url } = useRouteMatch();

    const article = articles.find(article => article._id === id);
    const initialState = {
        title: article.title,
        body: article.body,
        categoryId: article.category.id,
        tagIds: article.tags.map(tag => tag._id),
        isUpdating: false,
        errorMessage: null,
    };
    const [state, setState] = React.useState(initialState);

    const handleSubmit = () => {
        setState({
            ...state,
            isUpdating: true
        });

        fetch(`http://localhost:8000/articles/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleChange = (e) => {
        const target = e.target;
        const field = target.name;
        const value = target.value;
        setState({
            ...state,
            [field]: value
        });
    }

    if (!authState.isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <>
            {article !== undefined && 
            <>
                <h2>Edit article form</h2>
                <h4>Author: {article.author.username}</h4>
                <Form onSubmit={handleSubmit}>
                    {state.errorMessage &&
                        <Alert variant="danger">
                            {state.errorMessage}
                        </Alert>
                    }
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            required 
                            as="input"
                            type="text" 
                            name="title"
                            value={state.title}
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="body">
                        <Form.Label>Body</Form.Label>
                        <Form.Control 
                            required
                            as="textarea"
                            rows="20"
                            name="body"
                            value={state.body}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={state.isUpdating}>
                        Update
                    </Button>
                </Form>
            </>}
        </>
    );
};

export default Edit;