import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../App';
import useFetch from '../../hooks/useFetch';

const Show = () => {
    
    const { id } = useParams();
    const { state: authState } = React.useContext(AuthContext);
    const headers = React.useMemo(() =>  {
        return {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        };
    }, [authState.token]);

    const { loading, error, data = [] } = useFetch(`http://localhost:8000/articles/${id}`, headers);

    const { url } = useRouteMatch();

    if (error) return <p>Error!</p>;
    if (loading) return <p>Loading...</p>;

    const article = data;

    if (!authState.isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <>
            {article !== null &&
            <>
                <h2>{article.title}</h2>
                <h4>
                    Author: {article.author.username}
                    {article.author._id === authState.user._id &&
                    <Navbar className="float-right">
                        <Nav.Item className="ml-auto">
                            <Nav.Link 
                                className="btn btn-outline-warning" 
                                as={Link} 
                                to={`${url}/edit`}
                            >
                                Edit
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                className="btn btn-outline-danger ml-3" 
                                as={Link} 
                                to={`${url}/delete`}
                            >
                                Delete
                            </Nav.Link>
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