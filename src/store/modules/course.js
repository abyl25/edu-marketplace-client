import { COURSES_REQUEST, COURSES_SUCCESS, COURSES_ERROR, INSTR_COURSES_REQUEST, INSTR_COURSE_REQUEST, INSTR_COURSES_SUCCESS,
    INSTR_COURSE_SUCCESS, INSTR_COURSES_ERROR, INSTR_COURSE_UPDATE_REQUEST, INSTR_COURSE_UPDATE_SUCCESS, INSTR_COURSE_UPDATE_ERROR,
    INSTR_COURSE_CREATE_REQUEST, INSTR_COURSE_CREATE_SUCCESS, INSTR_COURSE_CREATE_ERROR, INSTR_CREATE_COURSE_TARGET_REQUEST,
    INSTR_CREATE_COURSE_TARGET_SUCCESS, INSTR_CREATE_COURSE_TARGET_ERROR} from '../actions';
import axios from 'axios';

const state = {
    courses: [],
    instructorCourses: [],
    instructorCourse: {},
    status: '',
    fetched: false,
    message: '',
};

const getters = {
    courses: state => state.courses,
    instrCourses: state => state.instructorCourses,
    instrCourse: state => state.instructorCourse,
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
                    // console.log(err);
                    commit(COURSES_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_COURSES_REQUEST]: ({commit}, instructorID) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_COURSES_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`/api/instructor/${instructorID}/courses`, config)
                .then(res => {
                    // console.log(res.data);
                    commit(INSTR_COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    // console.log(err);
                    commit(INSTR_COURSES_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_COURSE_REQUEST]: ({commit}, { instructorID, courseId }) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_COURSE_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`/api/instructor/${instructorID}/courses/${courseId}`, config)
                .then(res => {
                    // console.log(res.data);
                    commit(INSTR_COURSE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    // console.log(err);
                    commit(INSTR_COURSES_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_COURSE_CREATE_REQUEST]: ({commit}, newCourse) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_COURSE_CREATE_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.post(`/api/courses`, newCourse, config)
                .then(res => {
                    // console.log(res.data);
                    commit(INSTR_COURSE_CREATE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    // console.log(err);
                    commit(INSTR_COURSE_CREATE_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_COURSE_UPDATE_REQUEST]: ({commit}, { courseId, updateCourse }) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_COURSE_UPDATE_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.put(`/api/courses/${courseId}`, updateCourse, config) // /${courseId}
                .then(res => {
                    // console.log(res.data);
                    commit(INSTR_COURSE_UPDATE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    // console.log(err);
                    commit(INSTR_COURSE_UPDATE_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_CREATE_COURSE_TARGET_REQUEST]: ({commit}, target) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_CREATE_COURSE_TARGET_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.post(`/api/courses/target`, target, config)
                .then(res => {
                    // console.log(res.data);
                    commit(INSTR_CREATE_COURSE_TARGET_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    // console.log(err);
                    commit(INSTR_CREATE_COURSE_TARGET_ERROR);
                    reject(err);
                });
        });
    },

};

const mutations = {
    // General Courses
    [COURSES_REQUEST]: (state) => {
        state.status = 'Fetching courses...';
    },
    [COURSES_SUCCESS]: (state, res) => {
        state.status = 'Fetch Success';
        state.courses = res.data;
    },
    [COURSES_ERROR]: (state) => {
        state.status = 'Fetch Error';
    },
    // Instructor Courses
    [INSTR_COURSES_REQUEST]: (state) => {
        state.status = 'Instructor Courses Fetch Request';
    },
    [INSTR_COURSE_REQUEST]: (state) => {
        state.status = 'Instructor Course Fetch Request';
    },
    [INSTR_COURSES_SUCCESS]: (state, res) => {
        state.status = 'Instructor Courses Fetch Success';
        state.instructorCourses = res.data;
    },
    [INSTR_COURSES_ERROR]: (state) => {
        state.status = 'Instructor Courses Fetch Error';
    },
    [INSTR_COURSE_SUCCESS]: (state, res) => {
        state.status = 'Instructor Course Fetch Success';
        state.instructorCourse = res.data;
    },
    // Instructor Course Creation
    [INSTR_COURSE_CREATE_REQUEST]: (state) => {
        state.status = 'Instructor Course Create Request';
    },
    [INSTR_COURSE_CREATE_SUCCESS]: (state, res) => {
        state.status = 'Instructor Course Create Success';
        // state.instructorCourse = res.data;
    },
    [INSTR_COURSE_CREATE_ERROR]: (state) => {
        state.status = 'Instructor Course Create Error';
    },
    // Instructor Course Update
    [INSTR_COURSE_UPDATE_REQUEST]: (state) => {
        state.status = 'Instructor Course Update Request';
    },
    [INSTR_COURSE_UPDATE_SUCCESS]: (state, res) => {
        state.status = 'Instructor Course Update Success';
        // state.instructorCourse = res.data;
    },
    [INSTR_COURSE_UPDATE_ERROR]: (state) => {
        state.status = 'Instructor Course Update Error';
    },
    // Instructor Course Target
    [INSTR_CREATE_COURSE_TARGET_REQUEST]: (state) => {
        state.status = 'Instructor Course Target Request';
    },
    [INSTR_CREATE_COURSE_TARGET_SUCCESS]: (state) => {
        state.status = 'Instructor Course Target Success';
    },
    [INSTR_CREATE_COURSE_TARGET_ERROR]: (state) => {
        state.status = 'Instructor Course Target Error';
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
}
