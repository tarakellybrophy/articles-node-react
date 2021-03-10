import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Button, Modal, Alert } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { ArticlesContext } from '../Home';

const initialState = {
    show: false,
    isDeleting: false,
    hasError: false
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "DELETE_ARTICLE_REQUEST": {
            return {
                ...state,
                isDeleting: true,
                hasError: false
            };
        }
        case "DELETE_ARTICLE_SUCCESS": {
            return {
                ...state,
                isDeleting: false,
                show: false
            };
        }
        case "DELETE_ARTICLE_FAILURE": {
            return {
                ...state,
                isDeleting: false,
                hasError: true
            };
        }
        case "SET_SHOW": {
            return {
                ...state,
                show: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
const DeleteModal = (props) => {
    const id = props.id;

    let history = useHistory();

    const authContext = React.useContext(AuthContext);

    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const articlesContext = React.useContext(ArticlesContext);

    const setShow = (show) => {
        dispatch({
            type: "SET_SHOW",
            payload: show
        });
    };
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirm = () => {
        dispatch({
            type: "DELETE_ARTICLE_REQUEST"
        });
    
        fetch(`http://localhost:8000/articles/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authContext.state.token}`
            }
        })
        .then(res => {
            dispatch({
                type: "DELETE_ARTICLE_SUCCESS"
            });
            articlesContext.dispatch({
                type: "ARTICLE_DELETED",
                payload: id
            })
            history.push(`/articles`);
        })
        .catch(error => {
            dispatch({
                type: "DELETE_ARTICLE_FAILURE"
            });
        });
        setShow(false);
    };

    return (
        <>
            <Nav.Link as={Button} variant="outline-danger" onClick={handleShow}>
                Delete
            </Nav.Link>
            <Modal
                show={state.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {state.errorMessage &&
                    <Alert variant="danger">
                        {state.errorMessage}
                    </Alert>
                    }
                    <p>Are you sure you want to delete this article?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="outline-primary" 
                        onClick={handleConfirm} 
                        disabled={state.isDeleting}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;