import React from 'react';
import { Redirect } from 'react-router-dom';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { ArticlesContext } from '../Home';
import useFetch from '../../hooks/useFetch';

const Edit = () => {

    let history = useHistory();
    
    const { id } = useParams();
    const { state: authState } = React.useContext(AuthContext);
    const headers = React.useMemo(() =>  {
        return {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        };
    }, [authState.token]);

    const getCategories = useFetch(`http://localhost:8000/categories`, headers);
    const getTags = useFetch(`http://localhost:8000/tags`, headers);

    const { articles } = React.useContext(ArticlesContext);
    const { url } = useRouteMatch();

    const article = articles.find(article => article._id === id);
    const initialState = {
        title: article.title,
        body: article.body,
        category: article.category._id,
        tags: article.tags.map(tag => tag._id),
        isUpdating: false,
        errorMessage: null,
    };
    const [state, setState] = React.useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

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
            const updatedArticle = resJson;
            const index = articles.findIndex(article => article._id === updatedArticle._id);
            articles[index] = updatedArticle;
            setState({
                ...state,
                isUpdating: false
            });
            history.push(`/articles/${id}`);
        })
        .catch(error => {
            setState({
                ...state,
                errorMessage: error
            });
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

    const toggleTag = (e) => {
        const target = e.target;
        const id = target.id;
        const updatedTags = 
            state.tags.includes(id) ? 
            state.tags.filter(tag => tag !== id) :
            [...state.tags, id];

        setState({
            ...state,
            tags: updatedTags
        });
    }

    if (getCategories.error || getTags.error) return <p>Error!</p>;
    if (getCategories.loading || getTags.loading) return <p>Loading...</p>;

    if (state.errorMessage) return <p>{state.errorMessage}</p>;

    const categories = getCategories.data;
    const tags = getTags.data;

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