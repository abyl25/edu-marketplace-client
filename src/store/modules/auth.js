import authActions from "@/store/actions/authActions";
import authMutations from "@/store/mutations/authMutations";

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
    token: state => state.token,
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

export default {
    state,
    getters,
    actions: authActions,
    mutations: authMutations,
}
