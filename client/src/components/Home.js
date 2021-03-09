import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../App';
import Sidebar from './Sidebar';
import Show from './articles/Show';
import Edit from './articles/Edit';

import useFetch from '../hooks/useFetch';

const ArticlesContext = React.createContext();

const Home = () => {

    const { state: authState } = React.useContext(AuthContext);
    const headers = React.useMemo(() =>  {
        return {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        };
    }, [authState.token]);

    const { loading, error, data = [] } = useFetch('http://localhost:8000/articles', headers);

    const { path } = useRouteMatch();

    if (error) return <p>Error!</p>;
    if (loading) return <p>Loading...</p>;

    const articles = data;
    
    return (
        <ArticlesContext.Provider value={{
            articles
        }}>
            <Container>
                <Row>
                    <Col><h1>Our articles</h1></Col>
                </Row>
                {articles !== null && articles.length > 0 &&
                <Row>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>
                    <Col sm={9}>
                        <Switch>
                            <Route exact path={path}>
                                <h3>Please select an article.</h3>
                            </Route>
                            <Route path={`${path}/:id/edit`}>
                                <Edit />
                            </Route>
                            <Route path={`${path}/:id`}>
                                <Show />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
                }
                {articles === null || articles.length === 0 &&
                <Row>
                    <Col>
                        <p>There are no articles at the moment.</p>
                    </Col>
                </Row>
                }
            </Container>
        </ArticlesContext.Provider>
    );
};

export default Home;
export { ArticlesContext };