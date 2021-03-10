import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../App';
import DeleteModal from './DeleteModal';

const initialState = {
    article: null,
    isFetching: false,
    hasError: false
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "FETCH_ARTICLE_REQUEST": {
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        }
        case "FETCH_ARTICLE_SUCCESS": {
            return {
                ...state,
                isFetching: false,
                article: action.payload
            };
        }
        case "FETCH_ARTICLE_FAILURE": {
            return {
                ...state,
                isFetching: false,
                hasError: true
            };
        }
        default: {
            return state;
        }
    }
};

const Show = () => {
    const { id } = useParams();

    const authContext = React.useContext(AuthContext);

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({
            type: "FETCH_ARTICLE_REQUEST"
        });

        fetch(`http://localhost:8000/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${authContext.state.token}`
            }
        })
        .then(res => res.json())
        .then(resJson => {
            dispatch({
                type: "FETCH_ARTICLE_SUCCESS",
                payload: resJson
            });
        })
        .catch(error => {
            dispatch({
                type: "FETCH_ARTICLE_FAILURE"
            });
        });
    }, [authContext.state.token, id]);

    const { url } = useRouteMatch();

    if (state.hasError) return <p>Error!</p>;
    if (state.isFetching) return <p>Loading...</p>;

    const article = state.article;

    if (!authContext.state.isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <>
            {article !== null &&
            <>
                <h2>{article.title}</h2>
                <h4>
                    Author: {article.author.username}
                    {article.author._id === authContext.state.user._id &&
                    <Navbar className="float-right">
                        <Nav.Item className="mr-2">
                            <Nav.Link 
                                className="btn btn-outline-warning" 
                                as={Link} 
                                to={`${url}/edit`}
                            >
                                Edit
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <DeleteModal id={id} />
                        </Nav.Item>
                    </Navbar>
                    }
                </h4>
                <p>Category: {article.category.title}</p>
                {article.tags.length > 0 &&
                    <>
                        <p>Tags:</p>
                        <ul>
                            {article.tags.map(tag => (
                                <li key={tag._id}>{tag.title}</li>
                            ))}
                        </ul>
                    </>
                }
                <p><img src={article.image.path} alt="Nature" /></p>
                <p>{article.body}</p>
                {article.comments.length > 0 &&
                <>
                    <h4>Comments</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Author</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {article.comments.map(comment => (
                                <tr key={comment._id}>
                                    <td>{comment.author.username}</td>
                                    <td>{comment.body}</td>
                                    <td>{comment.updatedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                }
            </>
            }
    </>
    );
};

export default Show;