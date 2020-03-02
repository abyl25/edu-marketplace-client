import {
    ADD_COURSE_TO_CART_ERROR, ADD_COURSE_TO_CART_REQUEST, ADD_COURSE_TO_CART_SUCCESS, CART_COURSES_ERROR, CART_COURSES_REQUEST,
    CART_COURSES_SUCCESS, COURSE_ERROR, COURSE_REQUEST, COURSE_SUCCESS, COURSES_ERROR, COURSES_REQUEST, COURSES_SUCCESS, SEARCH_COURSES_REQUEST,
    SEARCH_COURSES_SUCCESS, SEARCH_COURSES_ERROR, DELETE_COURSE_FROM_CART_ERROR, DELETE_COURSE_FROM_CART_REQUEST, DELETE_COURSE_FROM_CART_SUCCESS,
    INSTR_COURSE_CREATE_ERROR, INSTR_COURSE_CREATE_REQUEST, INSTR_COURSE_CREATE_SUCCESS, INSTR_COURSE_REQUEST, INSTR_COURSE_SUCCESS,
    INSTR_COURSE_TARGET_ERROR, INSTR_COURSE_TARGET_REQUEST, INSTR_COURSE_TARGET_SUCCESS, INSTR_COURSE_UPDATE_ERROR, INSTR_COURSE_UPDATE_REQUEST,
    INSTR_COURSE_UPDATE_SUCCESS, INSTR_COURSES_ERROR, INSTR_COURSES_REQUEST, INSTR_COURSES_SUCCESS, INSTR_CREATE_COURSE_TARGET_ERROR,
    INSTR_CREATE_COURSE_TARGET_REQUEST, INSTR_CREATE_COURSE_TARGET_SUCCESS, INSTR_DELETE_COURSE_REQ_GOAL_ERROR, INSTR_DELETE_COURSE_REQ_GOAL_REQUEST,
    INSTR_DELETE_COURSE_REQ_GOAL_SUCCESS, REGISTER_TO_COURSE_REQUEST, REGISTER_TO_COURSE_SUCCESS, REGISTER_TO_COURSE_ERROR, MY_COURSES_REQUEST,
    MY_COURSES_SUCCESS, MY_COURSES_ERROR, INSTR_STUDENTS_REQUEST, INSTR_STUDENTS_SUCCESS, INSTR_STUDENTS_ERROR, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS,
    EMPTY_CART_ERROR, ADD_COURSE_SECTION_REQUEST, ADD_COURSE_SECTION_SUCCESS, ADD_COURSE_SECTION_ERROR, EDIT_COURSE_SECTION_REQUEST, EDIT_COURSE_SECTION_SUCCESS,
    EDIT_COURSE_SECTION_ERROR, DELETE_COURSE_SECTION_REQUEST, DELETE_COURSE_SECTION_SUCCESS, DELETE_COURSE_SECTION_ERROR, ADD_COURSE_LECTURE_REQUEST,
    ADD_COURSE_LECTURE_SUCCESS, ADD_COURSE_LECTURE_ERROR, EDIT_COURSE_LECTURE_REQUEST, EDIT_COURSE_LECTURE_SUCCESS, EDIT_COURSE_LECTURE_ERROR,
    DELETE_COURSE_LECTURE_REQUEST, DELETE_COURSE_LECTURE_SUCCESS, DELETE_COURSE_LECTURE_ERROR
} from './index';
import axios from "axios";

const api_endpoint = process.env.VUE_APP_API;
// const config = {
//     headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
// };

export default {
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
            axios.get(api_endpoint + `/api/instructor/${instructorID}/courses`)
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
            axios.get(api_endpoint + `/api/instructor/${instructorID}/courses/${courseId}`)
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
            axios.post(api_endpoint + `/api/courses`, newCourse)
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
            axios.put(api_endpoint + `/api/courses/${courseId}`, updateCourse)
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
            axios.get(api_endpoint + `/api/courses/${payload.courseId}/target`)
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
            axios.post(api_endpoint + `/api/courses/target`, payload)
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
            let url = '';
            if ('reqName' in payload) { // payload.hasOwnProperty('reqName')
                url = `${api_endpoint}/api/courses/${payload.courseId}/req/${payload.reqName}`;
            } else if ('goalName' in payload) {
                url = `${api_endpoint}/api/courses/${payload.courseId}/goal/${payload.goalName}`;
            }
            axios.delete(url)
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
            axios.get(`${api_endpoint}/api/instructor/${payload.instructorId}/courses/${payload.courseId}/students`)
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
            axios.post(api_endpoint + `/api/user/${payload.userId}/cart/${payload.courseId}`)
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
            axios.get(api_endpoint + `/api/user/${payload.userId}/cart`)
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
            axios.delete(api_endpoint + `/api/user/${payload.userId}/cart/${payload.courseId}`)
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
    [EMPTY_CART_REQUEST]: ({commit, rootState}) => {
        return new Promise((resolve, reject) => {
            commit(EMPTY_CART_REQUEST);
            const mutationPayload = {
                auth: rootState.auth
            };
            commit(EMPTY_CART_SUCCESS, mutationPayload);
        });
    },

    [REGISTER_TO_COURSE_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_TO_COURSE_REQUEST);
            console.log(payload);
            axios.post(`${api_endpoint}/api/courses/register`, payload)
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
            axios.get(`${api_endpoint}/api/user/${payload.studentId}/courses`)
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
    [ADD_COURSE_SECTION_REQUEST]: ({commit, rootState}, payload) => {
        return new Promise((resolve, reject) => {
            commit(ADD_COURSE_SECTION_REQUEST);
            axios.post(`${api_endpoint}/api/courses/${payload.courseId}/section`, { name: payload.name })
                .then(res => {
                    commit(ADD_COURSE_SECTION_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(ADD_COURSE_SECTION_ERROR);
                    reject(err);
                });
        });
    },
    [EDIT_COURSE_SECTION_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(EDIT_COURSE_SECTION_REQUEST);
            axios.put(`${api_endpoint}/api/courses/${payload.courseId}/section/${payload.sectionId}`, { name: payload.name })
                .then(res => {
                    commit(EDIT_COURSE_SECTION_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(EDIT_COURSE_SECTION_ERROR);
                    reject(err);
                });
        })
    },
    [DELETE_COURSE_SECTION_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(DELETE_COURSE_SECTION_REQUEST);
            axios.delete(`${api_endpoint}/api/courses/${payload.courseId}/section/${payload.sectionId}`)
                .then(res => {
                    commit(DELETE_COURSE_SECTION_SUCCESS);
                    resolve(res);
                })
                .catch(err => {
                    commit(DELETE_COURSE_SECTION_ERROR);
                    reject(err);
                });
        })
    },
    [ADD_COURSE_LECTURE_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(ADD_COURSE_LECTURE_REQUEST);
            axios.post(`${api_endpoint}/api/courses/${payload.courseId}/section/${payload.sectionId}/lecture`, { name: payload.name })
                .then(res => {
                    commit(ADD_COURSE_LECTURE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(ADD_COURSE_LECTURE_ERROR);
                    reject(err);
                });
        });
    },
    [EDIT_COURSE_LECTURE_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(EDIT_COURSE_LECTURE_REQUEST);
            axios.put(`${api_endpoint}/api/courses/${payload.courseId}/section/${payload.sectionId}/lecture/${payload.lectureId}`, { name: payload.name })
                .then(res => {
                    commit(EDIT_COURSE_LECTURE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(EDIT_COURSE_LECTURE_ERROR);
                    reject(err);
                });
        });
    },
    [DELETE_COURSE_LECTURE_REQUEST]: ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            commit(DELETE_COURSE_LECTURE_REQUEST);
            axios.delete(`${api_endpoint}/api/courses/${payload.courseId}/section/${payload.sectionId}/lecture/${payload.lectureId}`, { name: payload.name })
                .then(res => {
                    commit(DELETE_COURSE_LECTURE_SUCCESS, res);
                    resolve(res);
                })
                .catch(err => {
                    commit(DELETE_COURSE_LECTURE_ERROR);
                    reject(err);
                });
        });
    },
}
