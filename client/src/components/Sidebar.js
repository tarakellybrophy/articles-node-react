import React from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';

const pageSize = 10;

const Sidebar = (props) => {
    const [page, setPage] = React.useState(1);

    const articles = props.articles;
    const numPages = Math.floor(articles.length/pageSize)

    const firstPage = 1;
    const prevPage = (page > 1) ? page - 1 : page;
    const currentPage = page;
    const nextPage = (page < numPages) ? page + 1 : page;
    const lastPage = numPages;
    
    const start = (currentPage-1) * pageSize;
    const articlesToDisplay = articles.slice(start, start + pageSize);

    const showArticle = (index) => {
        props.dispatch({
            type: "ARTICLE_SELECTED",
            payload: (start + index)
        });
    }
    
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
                    <ListGroup.Item key={article._id} onClick={(e) => showArticle(index)}>
                        {article.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default Sidebar;