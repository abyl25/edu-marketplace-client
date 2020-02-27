import courseActions from "@/store/actions/courseActions";
import courseMutations from "@/store/mutations/courseMutations";

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

export default {
    state,
    getters,
    actions: courseActions,
    mutations: courseMutations,
}
