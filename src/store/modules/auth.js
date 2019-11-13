import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_ERROR, LOGIN_SUCCESS, SIGNUP_SUCCESS, AUTH_LOGOUT, ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_SUCCESS, ACCOUNT_CONFIRMATION_ERROR } from '../actions';
import axios from 'axios';

const state = {
    confirmed: false,
    signupSuccess: false,
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')),
    status: '',
    hasLoadedOnce: false
};

const getters = {
    authStatus: state => state.status,
    signupSuccess: state => state.signupSuccess,
    confirmed: state => state.confirmed,
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    // roles: state => state.user.roles,
    // roleName: state => state.roles[0].name,
    isInstructor: state => state.user.roles[0].name === 'Instructor',
    homePage: state => {
        let url = '';
        if (state.user.roles[0].name === 'Instructor') {
            url = '/instructor/home';
        } else if (state.user.roles[0].name === 'Student') {
            url = '/student/home';
        } else if (state.user.roles[0].name === 'Admin') {
            url = '/admin/home';
        }
        return url;
    }
};

const actions = {
    [AUTH_LOGIN]: ({commit}, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            axios.post('/api/auth/login', credentials)
                .then(res => {
                    console.log(res.data); // eslint-disable-line no-console
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    axios.defaults.headers.common['Authorization'] = res.data.token;
                    commit(LOGIN_SUCCESS, res);
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
            axios.post('/api/auth/signup', credentials)
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
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        });
    },
    [ACCOUNT_CONFIRMATION]: ({commit, dispatch}, confirmToken) => {
        return new Promise((resolve, reject) => {
            commit(ACCOUNT_CONFIRMATION);
            axios.get('/api/auth/confirmAccount?token=' + confirmToken)
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
        state.token = res.data.token;
        state.user = res.data.user;
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
        state.status = 'Your account confirmed! You can log in now';
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
