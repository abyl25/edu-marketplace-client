import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_ERROR, LOGIN_SUCCESS, SIGNUP_SUCCESS, AUTH_LOGOUT, ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_SUCCESS, ACCOUNT_CONFIRMATION_ERROR } from '../actions';
import axios from 'axios';

const state = {
    confirmed: false,
    signupSuccess: false,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    status: '',
    hasLoadedOnce: false
};

const getters = {
    confirmed: state => state.confirmed,
    isAuthenticated: state => !!state.token,
    username: state => state.username,
    authStatus: state => state.status,
    signupSuccess: state => state.signupSuccess
};

const actions = {
    [AUTH_LOGIN]: ({commit}, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            axios.post('http://localhost:8081/api/auth/login', credentials)
                .then(res => {
                    console.log(res.data); // eslint-disable-line no-console
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', res.data.userName);
                    // Here set the header of your ajax library to the token value. // example with axios
                    axios.defaults.headers.common['Authorization'] = res.data.token;
                    commit(LOGIN_SUCCESS, res);
                    // dispatch(USER_REQUEST);
                    resolve(res);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    [AUTH_SIGNUP]: ({commit, dispatch}, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_SIGNUP);
            axios.post('http://localhost:8081/api/auth/signup', credentials)
                .then(res => {
                    console.log(res.data); // eslint-disable-line no-console
                    commit(SIGNUP_SUCCESS);
                    resolve(res);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.clear();
            resolve();
        });
    },
    [ACCOUNT_CONFIRMATION]: ({commit, dispatch}, confirmToken) => {
        return new Promise((resolve, reject) => {
            commit(ACCOUNT_CONFIRMATION);
            axios.get('http://localhost:8081/api/auth/confirmAccount?token=' + confirmToken)
                .then(res => {
                    commit(ACCOUNT_CONFIRMATION_SUCCESS);
                    resolve(res);
                })
                .catch(err => {
                    commit(ACCOUNT_CONFIRMATION_ERROR);
                    reject(err);
                });
        });
    }
};

const mutations = {
    [AUTH_LOGIN]: (state) => {
        state.status = 'Signing in...';
    },
    [AUTH_SIGNUP]: (state) => {
        state.status = 'Signing up...';
    },
    [LOGIN_SUCCESS]: (state, res) => {
        state.status = 'Login Success';
        state.username = res.data.userName;
        state.token = res.data.token;
        state.hasLoadedOnce = true;
    },
    [SIGNUP_SUCCESS]: (state) => {
        state.status = 'Signup Success! We have sent you a confirmation email. Please, confirm your account!';
        state.signupSuccess = true;
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'Error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = '';
    },
    [ACCOUNT_CONFIRMATION]: (state) => {
        state.status = 'Confirming your account...'
    },
    [ACCOUNT_CONFIRMATION_SUCCESS]: (state) => {
        state.status = 'Account Confirmed! Redirecting to login page ...';
        state.confirmed = true;
    },
    [ACCOUNT_CONFIRMATION_ERROR]: (state) => {
        state.status = 'Account Confirmation Error!';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
