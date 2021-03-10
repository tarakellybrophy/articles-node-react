import React from 'react';
import { Redirect } from 'react-router-dom';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { ArticlesContext } from '../Home';
import useFetch from '../../hooks/useFetch';

let initialState = {
    title: null,
    body: null,
    category: null,
    tags: [],
    isUpdating: false,
    hasError: false
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "PUT_ARTICLE_REQUEST": {
            return {
                ...state,
                isUpdating: true,
                hasError: false
            };
        }
        case "PUT_ARTICLE_SUCCESS": {
            return {
                ...state,
                isUpdating: false,
                article: action.payload
            };
        }
        case "PUT_ARTICLE_FAILURE": {
            return {
                ...state,
                isUpdating: false,
                hasError: true
            };
        }
        case "UPDATE_ARTICLE": {
            return {
                ...state,
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
};

const Edit = () => {

    let history = useHistory();
    
    const { id } = useParams();

    const articlesContext = React.useContext(ArticlesContext);
    const articles = articlesContext.state.articles;
    const article = articles.find(article => article._id === id);
    
    initialState.title = article.title;
    initialState.body = article.body;
    initialState.category = article.category._id;
    initialState.tags = article.tags.map(tag => tag._id);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const authContext = React.useContext(AuthContext);
    const headers = React.useMemo(() =>  {
        return {
            headers: {
                Authorization: `Bearer ${authContext.state.token}`
            }
        };
    }, [authContext.state.token]);

    const getCategories = useFetch(`http://localhost:8000/categories`, headers);
    const getTags = useFetch(`http://localhost:8000/tags`, headers);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "PUT_ARTICLE_REQUEST"
        });

        fetch(`http://localhost:8000/articles/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authContext.state.token}`
            },
            body: JSON.stringify({
                title: state.title,
                body: state.body,
                category: state.category,
                tags: state.tags
            })
        })
        .then(res => res.json())
        .then(resJson => {
            dispatch({
                type: "PUT_ARTICLE_SUCCESS"
            });
            articlesContext.dispatch({
                type: "ARTICLE_UPDATED",
                payload: resJson
            })
            history.push(`/articles/${id}`);
        })
        .catch(error => {
            dispatch({
                type: "PUT_ARTICLE_FAILURE"
            });
        });
    };

    const handleChange = (e) => {
        const target = e.target;
        const field = target.name;
        const value = target.value;
        dispatch({
            type: "UPDATE_ARTICLE",
            payload: {
                [field]: value
            }
        });
    }

    const toggleTag = (e) => {
        const target = e.target;
        const id = target.id;
        let updatedTags = null;
        if (state.tags.includes(id)) {
            updatedTags = state.tags.filter(tag => tag !== id);
        } 
        else {
            updatedTags = [...state.tags, id];
        }
        dispatch({
            type: "UPDATE_ARTICLE",
            payload: {
                tags: updatedTags
            }
        });
    }

    if (getCategories.error || getTags.error) return <p>Error!</p>;
    if (getCategories.loading || getTags.loading) return <p>Loading...</p>;

    if (state.errorMessage) return <p>{state.errorMessage}</p>;

    const categories = getCategories.data;
    const tags = getTags.data;

    if (!authContext.state.isAuthenticated) {
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
                            rows="15"
                            name="body"
                            value={state.body}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="category"
                            defaultValue={article.category._id}
                            onChange={handleChange}
                        >
                            {categories !== null && categories.map(category => (
                            <option 
                                key={category._id}
                                value={category._id}
                            >
                                {category.title}
                            </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Container>
                            <Row>
                                {tags !== null && tags.map(tag => (
                                    <Col sm={6} md={3} key={tag._id}>
                                        <Form.Check 
                                            type="checkbox"
                                            id={tag._id}
                                            name="tags"
                                            label={tag.title}
                                            checked={state.tags.find(tag2 => tag2 === tag._id)}
                                            onChange={toggleTag}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
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