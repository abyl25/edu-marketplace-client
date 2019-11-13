import { COURSES_REQUEST, COURSES_SUCCESS, COURSES_ERROR, INSTR_COURSES_REQUEST, INSTR_COURSE_REQUEST, INSTR_COURSES_SUCCESS,
    INSTR_COURSE_SUCCESS, INSTR_COURSES_ERROR, INSTR_COURSE_UPDATE_REQUEST, INSTR_COURSE_UPDATE_SUCCESS, INSTR_COURSE_UPDATE_ERROR,
    INSTR_COURSE_CREATE_REQUEST, INSTR_COURSE_CREATE_SUCCESS, INSTR_COURSE_CREATE_ERROR, INSTR_CREATE_COURSE_TARGET_REQUEST,
    INSTR_CREATE_COURSE_TARGET_SUCCESS, INSTR_CREATE_COURSE_TARGET_ERROR, INSTR_COURSE_TARGET_REQUEST, INSTR_COURSE_TARGET_SUCCESS,
    INSTR_COURSE_TARGET_ERROR, INSTR_DELETE_COURSE_REQ_GOAL_REQUEST, INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS, INSTR_DELETE_COURSE_REQ_GOAL_ERROR
} from '../actions';
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
                    commit(COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
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
                    commit(INSTR_COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
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
                    commit(INSTR_COURSE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
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
                    commit(INSTR_COURSE_CREATE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
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
                    commit(INSTR_COURSE_UPDATE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(INSTR_COURSE_UPDATE_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_COURSE_TARGET_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_COURSE_TARGET_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`/api/courses/${payload.courseId}/target`, config)
                .then(res => {
                    commit(INSTR_COURSE_TARGET_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(INSTR_COURSE_TARGET_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_CREATE_COURSE_TARGET_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_CREATE_COURSE_TARGET_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.post(`/api/courses/target`, payload, config)
                .then(res => {
                    commit(INSTR_CREATE_COURSE_TARGET_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(INSTR_CREATE_COURSE_TARGET_ERROR);
                    reject(err);
                });
        });
    },
    [INSTR_DELETE_COURSE_REQ_GOAL_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_DELETE_COURSE_REQ_GOAL_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            let url = '';
            if ('reqName' in payload) { // payload.hasOwnProperty('reqName')
                url = `/api/courses/${payload.courseId}/req/${payload.reqName}`;
            } else if ('goalName' in payload) {
                url = `/api/courses/${payload.courseId}/goal/${payload.goalName}`;
            }
            axios.delete(url, config)
                .then(res => {
                    commit(INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(INSTR_DELETE_COURSE_REQ_GOAL_ERROR);
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
    // INSTR_COURSE_TARGET_REQUEST
    [INSTR_COURSE_TARGET_REQUEST]: (state) => {
        state.status = 'Instructor Course Target Request';
    },
    [INSTR_COURSE_TARGET_SUCCESS]: (state) => {
        state.status = 'Instructor Course Target Success';
    },
    [INSTR_COURSE_TARGET_ERROR]: (state) => {
        state.status = 'Instructor Course Target Error';
    },
    // Instructor Course Target
    [INSTR_CREATE_COURSE_TARGET_REQUEST]: (state) => {
        state.status = 'Instructor Create Course Target Request';
    },
    [INSTR_CREATE_COURSE_TARGET_SUCCESS]: (state) => {
        state.status = 'Instructor Create Course Target Success';
    },
    [INSTR_CREATE_COURSE_TARGET_ERROR]: (state) => {
        state.status = 'Instructor Create Course Target Error';
    },
    // Instructor Delete Course Req
    [INSTR_DELETE_COURSE_REQ_GOAL_REQUEST]: (state) => {
        state.status = 'Instructor Delete Course Req Goal Request';
    },
    [INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS]: (state) => {
        state.status = 'Instructor Delete Course Req Goal Success';
    },
    [INSTR_DELETE_COURSE_REQ_GOAL_ERROR]: (state) => {
        state.status = 'Instructor Delete Course Req Goal Error';
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
}
