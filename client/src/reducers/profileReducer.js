
import * as actionTypes from '../actions/actionTypes';
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case actionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case actionTypes.CLEAR_PROFILE:
            return {
                ...state,
                loading: false,
                profile: null,
                repos: []
            };
        default:
            return state;
    }
}