import { COURSES_REQUEST, COURSES_SUCCESS, COURSES_ERROR } from '../actions';
import axios from 'axios';

const state = {
    courses: [],
    status: '',
    fetched: false,
    message: ''
};

const getters = {
    courses: state => state.courses,
    courseStatus: state => state.status,
    fetched: state => state.fetched,
    message: state => state.message,
};

const actions = {
    [COURSES_REQUEST]: ({commit}, searchText) => {
        return new Promise((resolve, reject) => {
            commit(COURSES_REQUEST);
            axios.get('/api/courses/search?q=' + searchText)
                .then(res => {
                    // console.log(res.data);
                    commit(COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    commit(COURSES_ERROR);
                    reject();
                });
        });
    }
};

const mutations = {
    [COURSES_REQUEST]: (state) => {
        state.status = 'Fetching courses...';
    },
    [COURSES_SUCCESS]: (state, res) => {
        state.status = 'Fetch Success';
        state.courses = res.data;
    },
    [COURSES_ERROR]: (state) => {
        state.status = 'Fetch Error';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
