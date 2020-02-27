import {
    ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_ERROR, ACCOUNT_CONFIRMATION_SUCCESS, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT,
    AUTH_SIGNUP, LOGIN_SUCCESS, SIGNUP_SUCCESS
} from "@/store/actions/index";
import axios from "axios";

const api_endpoint = process.env.VUE_APP_API;

export default {
    [AUTH_LOGIN]: ({commit}, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            axios.post(api_endpoint + '/api/auth/login', credentials)
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
            axios.post(api_endpoint + '/api/auth/signup', credentials)
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
            axios.get(api_endpoint + '/api/auth/confirmAccount?token=' + confirmToken)
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
}
