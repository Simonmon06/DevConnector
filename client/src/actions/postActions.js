import axios from 'axios';
import {setAlert} from "./alertActions";
import * as actionTypes from "./actionTypes";

export const getPosts =() => async dispatch =>{
    try{
        const res = await axios.get('/api/posts');

        dispatch(
            {type: actionTypes.GET_POSTS,
                payload: res.data
            }
        )
    }catch(error){
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })

    }
}
//Get post by id
export const getPost =(id) => async dispatch =>{
    try{
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
            }
        )
    }catch(error){
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })

    }
}
// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: actionTypes.UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: actionTypes.UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: actionTypes.DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Add post
export const addPost = formData => async dispatch => {
    const config={
        headers:{
            'Content-Type' :'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData,config);

        dispatch({
            type: actionTypes.ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add comment
export const addComment = (postId,formData) => async dispatch => {
    const config={
        headers:{
            'Content-Type' :'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData,config);

        dispatch({
            type: actionTypes.ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: actionTypes.REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};




