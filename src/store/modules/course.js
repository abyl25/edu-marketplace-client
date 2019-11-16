import {
    ADD_COURSE_TO_CART_ERROR,
    ADD_COURSE_TO_CART_REQUEST,
    ADD_COURSE_TO_CART_SUCCESS,
    CART_COURSES_ERROR,
    CART_COURSES_REQUEST,
    CART_COURSES_SUCCESS,
    COURSE_ERROR,
    COURSE_REQUEST,
    COURSE_SUCCESS,
    COURSES_ERROR,
    COURSES_REQUEST,
    COURSES_SUCCESS,
    DELETE_COURSE_FROM_CART_ERROR,
    DELETE_COURSE_FROM_CART_REQUEST,
    DELETE_COURSE_FROM_CART_SUCCESS,
    INSTR_COURSE_CREATE_ERROR,
    INSTR_COURSE_CREATE_REQUEST,
    INSTR_COURSE_CREATE_SUCCESS,
    INSTR_COURSE_REQUEST,
    INSTR_COURSE_SUCCESS,
    INSTR_COURSE_TARGET_ERROR,
    INSTR_COURSE_TARGET_REQUEST,
    INSTR_COURSE_TARGET_SUCCESS,
    INSTR_COURSE_UPDATE_ERROR,
    INSTR_COURSE_UPDATE_REQUEST,
    INSTR_COURSE_UPDATE_SUCCESS,
    INSTR_COURSES_ERROR,
    INSTR_COURSES_REQUEST,
    INSTR_COURSES_SUCCESS,
    INSTR_CREATE_COURSE_TARGET_ERROR,
    INSTR_CREATE_COURSE_TARGET_REQUEST,
    INSTR_CREATE_COURSE_TARGET_SUCCESS,
    INSTR_DELETE_COURSE_REQ_GOAL_ERROR,
    INSTR_DELETE_COURSE_REQ_GOAL_REQUEST,
    INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS,
} from '../actions';
import axios from 'axios';

const state = {
    courses: [],
    instructorCourses: [],
    instructorCourse: {},
    cartCourses: [],
    status: '',
    fetched: false,
    message: '',
};

const getters = {
    courses: state => state.courses,
    instrCourses: state => state.instructorCourses,
    instrCourse: state => state.instructorCourse,
    cartCourses: state => state.cartCourses,
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
    [COURSE_REQUEST]: ({commit}, courseId) => {
        return new Promise((resolve, reject) => {
            commit(COURSE_REQUEST);
            // commit(COURSE_SUCCESS, courseId);
            axios.get('/api/courses/' + courseId)
                .then(res => {
                    commit(COURSE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(COURSE_ERROR);
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
            axios.put(`/api/courses/${courseId}`, updateCourse, config)
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
    [ADD_COURSE_TO_CART_REQUEST]: ({commit, rootState}, payload) => {
        return new Promise((resolve, reject) => {
            commit(ADD_COURSE_TO_CART_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.post(`/api/user/${payload.userId}/cart/${payload.courseId}`, config)
                .then(res => {
                    const mutationPayload = {
                        auth: rootState.auth,
                        data: res.data
                    };
                    commit(ADD_COURSE_TO_CART_SUCCESS, mutationPayload);
                    resolve(res);
                })
                .catch(err => {
                    commit(ADD_COURSE_TO_CART_ERROR);
                    reject(err);
                });
        });
    },
    [CART_COURSES_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(CART_COURSES_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`/api/user/${payload.userId}/cart`, config)
                .then(res => {
                    commit(CART_COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(CART_COURSES_ERROR);
                    reject(err);
                });
        });
    },
    [DELETE_COURSE_FROM_CART_REQUEST]: ({commit, rootState}, payload) => {
        return new Promise((resolve, reject) => {
            commit(DELETE_COURSE_FROM_CART_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.delete(`/api/user/${payload.userId}/cart/${payload.courseId}`, config)
                .then(res => {
                    const mutationPayload = {
                        auth: rootState.auth,
                        courseId: payload.courseId
                    };
                    commit(DELETE_COURSE_FROM_CART_SUCCESS, mutationPayload);
                    resolve(res);
                })
                .catch(err => {
                    commit(DELETE_COURSE_FROM_CART_ERROR);
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
    // Course Details
    [COURSE_REQUEST]: (state) => {
        state.status = 'Course Fetch Request';
    },
    [COURSE_SUCCESS]: (state, res) => {
        state.status = 'Course Fetch Success';
        // state.courses = res.data;
    },
    [COURSE_ERROR]: (state) => {
        state.status = 'Course Fetch Error';
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
    // Get Cart Courses
    [CART_COURSES_REQUEST]: (state) => {
        state.status = 'Cart Courses Request';
    },
    [CART_COURSES_SUCCESS]: (state, res) => {
        state.status = 'Cart Courses Success';
        state.cartCourses = res.data;
    },
    [CART_COURSES_ERROR]: (state) => {
        state.status = 'Cart Courses Error';
    },
    // Add Course To Cart
    [ADD_COURSE_TO_CART_REQUEST]: (state) => {
        state.status = 'Add Course To Cart Request';
    },
    [ADD_COURSE_TO_CART_SUCCESS]: (state, {auth, data}) => {
        state.status = 'Add Course To Cart Success';
        auth.user.cart.cartItems.push(data);
        localStorage.setItem('user', JSON.stringify(auth.user));
    },
    [ADD_COURSE_TO_CART_ERROR]: (state) => {
        state.status = 'Add Course To Cart Error';
    },
    // Delete Course From Cart
    [DELETE_COURSE_FROM_CART_REQUEST]: (state) => {
        state.status = 'Delete Course From Cart Request';
    },
    [DELETE_COURSE_FROM_CART_SUCCESS]: (state, {auth, courseId}) => {
        state.status = 'Delete Course From Cart Success';
        state.cartCourses = state.cartCourses.filter(i => i.course.id !== courseId);
        auth.user.cart.cartItems = auth.user.cart.cartItems.filter(i => i.course.id !== courseId);
        localStorage.setItem('user', JSON.stringify(auth.user));
    },
    [DELETE_COURSE_FROM_CART_ERROR]: (state) => {
        state.status = 'Delete Course From Cart Error';
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
}
