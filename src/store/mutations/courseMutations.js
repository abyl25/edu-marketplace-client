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
    EMPTY_CART_ERROR,
} from '../actions';

export default {
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
    // Empty cart
    [EMPTY_CART_REQUEST]: (state) => {
        state.status = 'Empty Cart Request';
    },
    [EMPTY_CART_SUCCESS]: (state, {auth}) => {
        state.status = 'Empty Cart Success';
        state.cartCourses.splice(0, state.cartCourses.length);
        auth.user.cart.cartItems.splice(0, auth.user.cart.cartItems.length);
        localStorage.setItem('user', JSON.stringify(auth.user));
    },
    [EMPTY_CART_ERROR]: (state) => {
        state.status = 'Empty Cart Error';
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
}
