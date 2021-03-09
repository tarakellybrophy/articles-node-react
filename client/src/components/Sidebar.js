import React from 'react';
import { ListGroup, Pagination, Nav } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { ArticlesContext } from './Home';

const pageSize = 10;

const Sidebar = () => {
    const [page, setPage] = React.useState(1);
    const { url } = useRouteMatch();
    const { articles } = React.useContext(ArticlesContext);
    
    const numPages = Math.floor(articles.length/pageSize)

    const firstPage = 1;
    const prevPage = (page > 1) ? page - 1 : page;
    const currentPage = page;
    const nextPage = (page < numPages) ? page + 1 : page;
    const lastPage = numPages;
    
    const start = (currentPage-1) * pageSize;
    const articlesToDisplay = articles.slice(start, start + pageSize);

    return (
        <>
            <Pagination className="justify-content-center">
                {currentPage > firstPage && 
                <>
                    <Pagination.First onClick={(e) => setPage(firstPage)} />
                    <Pagination.Prev onClick={(e) => setPage(prevPage)} />
                </>
                }
                <Pagination.Item onClick={(e) => setPage(currentPage)}>
                    {currentPage}
                </Pagination.Item>                        
                {currentPage < lastPage &&
                <>
                    <Pagination.Next onClick={(e) => setPage(nextPage)} />
                    <Pagination.Last onClick={(e) => setPage(lastPage)} />
                </>
                }
            </Pagination>
            <ListGroup>
                {articlesToDisplay.map((article, index) => (
                    <ListGroup.Item key={article._id}>
                        <Link to={`${url}/${article._id}`}>
                                {article.title}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Nav.Item>
                <Nav.Link 
                    className="btn btn-outline-primary mt-3" 
                    as={Link} 
                    to="/articles/create"
                >
                    Create new article
                </Nav.Link>
            </Nav.Item>
        </>
    );
};

export default Sidebar;