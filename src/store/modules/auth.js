/* eslint-disable promise/param-names */
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions';
import { USER_REQUEST } from '../actions';
import axios from 'axios';

const state = {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    status: '',
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    username: state => state.username,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_LOGIN]: ({commit, dispatch}, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            axios.post('http://localhost:8081/api/auth/login', credentials)
                .then(res => {
                    console.log(res.data); // eslint-disable-line no-console
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', res.data.userName);
                    // Here set the header of your ajax library to the token value. // example with axios
                    axios.defaults.headers.common['Authorization'] = res.data.token;
                    commit(AUTH_SUCCESS, res);
                    // dispatch(USER_REQUEST);
                    resolve(res);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('token');
                    reject(err);
                })
        });
    },
    // [AUTH_SIGNUP]: ({commit, dispatch}, user) => {
    //     return new Promise((resolve, reject) => {
    //
    //     });
    // },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.clear();
            resolve();
        });
    }
};

const mutations = {
    [AUTH_LOGIN]: (state) => {
        state.status = 'Loading...';
    },
    [AUTH_SIGNUP]: (state) => {
        state.status = 'Loading...';
    },
    [AUTH_SUCCESS]: (state, res) => {
        state.status = 'Success';
        state.username = res.data.userName;
        state.token = res.data.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'Error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}