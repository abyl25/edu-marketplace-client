import {
    ADD_COURSE_TO_CART_ERROR, ADD_COURSE_TO_CART_REQUEST, ADD_COURSE_TO_CART_SUCCESS, CART_COURSES_ERROR, CART_COURSES_REQUEST,
    CART_COURSES_SUCCESS, COURSE_ERROR, COURSE_REQUEST, COURSE_SUCCESS, COURSES_ERROR, COURSES_REQUEST, COURSES_SUCCESS, SEARCH_COURSES_REQUEST,
    SEARCH_COURSES_SUCCESS, SEARCH_COURSES_ERROR, DELETE_COURSE_FROM_CART_ERROR, DELETE_COURSE_FROM_CART_REQUEST, DELETE_COURSE_FROM_CART_SUCCESS,
    INSTR_COURSE_CREATE_ERROR, INSTR_COURSE_CREATE_REQUEST, INSTR_COURSE_CREATE_SUCCESS, INSTR_COURSE_REQUEST, INSTR_COURSE_SUCCESS,
    INSTR_COURSE_TARGET_ERROR, INSTR_COURSE_TARGET_REQUEST, INSTR_COURSE_TARGET_SUCCESS, INSTR_COURSE_UPDATE_ERROR, INSTR_COURSE_UPDATE_REQUEST,
    INSTR_COURSE_UPDATE_SUCCESS, INSTR_COURSES_ERROR, INSTR_COURSES_REQUEST, INSTR_COURSES_SUCCESS, INSTR_CREATE_COURSE_TARGET_ERROR,
    INSTR_CREATE_COURSE_TARGET_REQUEST, INSTR_CREATE_COURSE_TARGET_SUCCESS, INSTR_DELETE_COURSE_REQ_GOAL_ERROR, INSTR_DELETE_COURSE_REQ_GOAL_REQUEST,
    INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS, REGISTER_TO_COURSE_REQUEST, REGISTER_TO_COURSE_SUCCESS, REGISTER_TO_COURSE_ERROR, MY_COURSES_REQUEST,
    MY_COURSES_SUCCESS, MY_COURSES_ERROR, INSTR_STUDENTS_REQUEST, INSTR_STUDENTS_SUCCESS, INSTR_STUDENTS_ERROR
} from '../actions';
import axios from 'axios';

const api_endpoint = process.env.VUE_APP_API;

const state = {
    courses: [],
    instructorCourses: [],
    instructorCourse: {},
    instructorCourseStudents: [],
    cartCourses: [],
    myCourses: [],
    myCourse: {},
    status: '',
    fetched: false,
    message: '',
};

const getters = {
    courses: state => state.courses,
    instrCourses: state => state.instructorCourses,
    instrCourse: state => state.instructorCourse,
    instrCourseStudents: state => state.instructorCourseStudents,
    cartCourses: state => state.cartCourses,
    myCourses: state => state.myCourses,
    myCourse: state => state.myCourse,
    courseStatus: state => state.status,
    fetched: state => state.fetched,
    message: state => state.message,
};

const actions = {
    [COURSES_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(COURSES_REQUEST);
            let url = '';
            if (payload.hasOwnProperty('subcategory')) {
                url = `${api_endpoint}/api/courses/category/${payload.category}/${payload.subcategory}`;
            } else {
                url = `${api_endpoint}/api/courses/category/${payload.category}`;
            }
            axios.get(url)
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
    [SEARCH_COURSES_REQUEST]: ({commit}, searchText) => {
        return new Promise((resolve, reject) => {
            commit(SEARCH_COURSES_REQUEST);
            axios.get(api_endpoint + '/api/courses/search?q=' + searchText)
                .then(res => {
                    commit(SEARCH_COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(SEARCH_COURSES_ERROR);
                    reject(err);
                });
        });
    },
    [COURSE_REQUEST]: ({commit}, courseId) => {
        return new Promise((resolve, reject) => {
            commit(COURSE_REQUEST);
            // commit(COURSE_SUCCESS, courseId);
            axios.get(api_endpoint + '/api/courses/' + courseId)
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
            axios.get(api_endpoint + `/api/instructor/${instructorID}/courses`, config)
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
            axios.get(api_endpoint + `/api/instructor/${instructorID}/courses/${courseId}`, config)
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
            axios.post(api_endpoint + `/api/courses`, newCourse, config)
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
            axios.put(api_endpoint + `/api/courses/${courseId}`, updateCourse, config)
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
            axios.get(api_endpoint + `/api/courses/${payload.courseId}/target`, config)
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
            axios.post(api_endpoint + `/api/courses/target`, payload, config)
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
                url = `${api_endpoint}/api/courses/${payload.courseId}/req/${payload.reqName}`;
            } else if ('goalName' in payload) {
                url = `${api_endpoint}/api/courses/${payload.courseId}/goal/${payload.goalName}`;
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
    [INSTR_STUDENTS_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(INSTR_STUDENTS_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`${api_endpoint}/api/instructor/${payload.instructorId}/courses/${payload.courseId}/students`, config)
                .then(res => {
                    commit(INSTR_STUDENTS_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(INSTR_STUDENTS_ERROR);
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
            axios.post(api_endpoint + `/api/user/${payload.userId}/cart/${payload.courseId}`, config)
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
            axios.get(api_endpoint + `/api/user/${payload.userId}/cart`, config)
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
            axios.delete(api_endpoint + `/api/user/${payload.userId}/cart/${payload.courseId}`, config)
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
    [REGISTER_TO_COURSE_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_TO_COURSE_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            console.log(payload);
            axios.post(`${api_endpoint}/api/courses/register`, payload, config)
                .then(res => {
                    commit(REGISTER_TO_COURSE_SUCCESS, payload.courseId);
                    resolve(res);
                })
                .catch(err => {
                    commit(REGISTER_TO_COURSE_ERROR);
                    reject(err);
                });
        });
    },
    [MY_COURSES_REQUEST]: ({commit, rootState}, payload) => {
        return new Promise((resolve, reject) => {
            commit(MY_COURSES_REQUEST);
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
            };
            axios.get(`${api_endpoint}/api/user/${payload.studentId}/courses`, config)
                .then(res => {
                    commit(MY_COURSES_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(MY_COURSES_ERROR);
                    reject(err);
                });
        });
    },

};

const mutations = {
    // General Courses
    [COURSES_REQUEST]: (state) => {
        state.status = 'Fetching Courses';
    },
    [COURSES_SUCCESS]: (state, res) => {
        state.status = 'Courses Fetch Success';
        state.courses = res.data;
    },
    [COURSES_ERROR]: (state) => {
        state.status = 'Courses Fetch Error';
    },
    // Search Courses
    [SEARCH_COURSES_REQUEST]: (state) => {
        state.status = 'Searching courses';
    },
    [SEARCH_COURSES_SUCCESS]: (state, res) => {
        state.status = 'Search Course Success';
        state.courses = res.data;
    },
    [SEARCH_COURSES_ERROR]: (state) => {
        state.status = 'Search Course Error';
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
    // Instructor Course Students
    [INSTR_STUDENTS_REQUEST]: (state) => {
        state.status = 'Instructor Students Request';
    },
    [INSTR_STUDENTS_SUCCESS]: (state, res) => {
        state.status = 'Instructor Students Success';
        state.instructorCourseStudents = res.data;
    },
    [INSTR_STUDENTS_ERROR]: (state) => {
        state.status = 'Instructor Students Error';
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
    // Register To Course
    [REGISTER_TO_COURSE_REQUEST]: (state) => {
        state.status = 'Register To Course Request Request';
    },
    [REGISTER_TO_COURSE_SUCCESS]: (state, courseId) => {
        state.status = 'Register To Course Request Success';
        const course = state.courses.filter(c => c.id === courseId);
        state.myCourses.push(course);
    },
    [REGISTER_TO_COURSE_ERROR]: (state) => {
        state.status = 'Register To Course Request Error';
    },
    // My Courses
    [MY_COURSES_REQUEST]: (state) => {
        state.status = 'Fetch My Courses Request';
    },
    [MY_COURSES_SUCCESS]: (state, res) => {
        state.status = 'Fetch My Courses Success';
        state.myCourses = res.data;
    },
    [MY_COURSES_ERROR]: (state) => {
        state.status = 'Fetch My Courses Error';
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
}
