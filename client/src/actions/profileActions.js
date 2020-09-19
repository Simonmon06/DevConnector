import axios from 'axios';
import {setAlert} from "./alertActions";
import * as actionTypes from "./actionTypes";
import {CLEAR_PROFILE} from "./actionTypes";


// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// Get all Profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: actionTypes.GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// Get profile by id
export const getProfilesById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// Get Github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: actionTypes.GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};
//Create or Update profile
export const createProfile = (formData, history, edit= false) => async dispatch =>{
    try{
        const config ={
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res =await axios.post('/api/profile', formData,config);
        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit? 'Profile Updated': 'Profile Created','success'));
        if(!edit){
            history.push('/dashboard');
        }
    }catch(error){
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Add experience
export const addExperience = (formData, history) => async dispatch =>{
    try{
        const config ={
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res =await axios.put('/api/profile/experience', formData,config);
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience Added",'success'));

    }catch(error){
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch =>{
    try{
        const config ={
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res =await axios.put('/api/profile/education', formData,config);
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education Added",'success'));

    }catch(error){
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

//Delete experience
export const deleteExperience = (id) => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Removed','success'))
    }catch(error){
        dispatch({
            type:actionTypes.PROFILE_ERROR,
            payload:{msg: error.response.statusText, status:error.response.status}
        })
    }
}

//Delete education
export const deleteEducation = (id) => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Removed','success'))
    }catch(error){
        dispatch({
            type:actionTypes.PROFILE_ERROR,
            payload:{msg: error.response.statusText, status:error.response.status}
        })
    }
}

//Delete account & profile
export const deleteAccount = () => async dispatch =>{
    if(window.confirm('ARE YOU SURE TO DELETE YOUR ACCOUNT? THIS CANNOT BE UNDONE!')){

        try{
            await axios.delete(`/api/profile`);
            dispatch({type: actionTypes.CLEAR_PROFILE,});
            dispatch({type: actionTypes.ACCOUNT_DELETED,});

            dispatch(setAlert('Account Deleted'))
        }catch(error){
            dispatch({
                type:actionTypes.PROFILE_ERROR,
                payload:{msg: error.response.statusText, status:error.response.status}
            })
        }
    }

}
