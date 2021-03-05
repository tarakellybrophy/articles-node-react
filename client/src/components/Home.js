import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../App';
import Sidebar from './Sidebar';
import Show from './articles/Show';

const ArticlesContext = React.createContext();

const initialState = {
    articles: [],
    isFetching: false,
    hasError: false,
    selectedIndex: 0
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "FETCH_ARTICLES_REQUEST": {
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        }
        case "FETCH_ARTICLES_SUCCESS": {
            return {
                ...state,
                isFetching: false,
                articles: action.payload
            };
        }
        case "FETCH_ARTICLES_FAILURE": {
            return {
                ...state,
                isFetching: false,
                hasError: true
            };
        }
        case "ARTICLE_SELECTED": {
            return {
                ...state,
                selectedIndex: parseInt(action.payload)
            };
        }
        default: {
            return state;
        }
    }
};

const Home = () => {

    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    React.useEffect(() => {
        dispatch({
            type: "FETCH_ARTICLES_REQUEST"
        });

        fetch("http://localhost:8000/articles", {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        })
        .then(res => res.json())
        .then(resJson => {
            dispatch({
                type: "FETCH_ARTICLES_SUCCESS",
                payload: resJson
            });
        })
        .catch(error => {
            dispatch({
                type: "FETCH_ARTICLES_FAILURE"
            });
        });
    }, [authState.token]);

    if (!authState.isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Container>
            <Row>
                <Col><h1>Our articles</h1></Col>
            </Row>
            {state.articles.length > 0 &&
            <Row>
                <Col sm={3}>
                    <Sidebar 
                        articles={state.articles} 
                        dispatch={dispatch}
                    />
                </Col>
                <Col sm={9}>
                    <Show article={state.articles[state.selectedIndex]} />
                </Col>
            </Row>
            }
            {state.articles.length === 0 &&
            <Row>
                <Col sm={12}>
                    <p>There are no articles at the moment.</p>
                </Col>
            </Row>
            }
        </Container>
    );
};

export default Home;
export { ArticlesContext };