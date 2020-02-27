import {
    ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_ERROR, ACCOUNT_CONFIRMATION_SUCCESS, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT,
    AUTH_SIGNUP, LOGIN_SUCCESS, SIGNUP_SUCCESS
} from "@/store/actions";

export default {
    [AUTH_LOGIN]: (state) => {
        state.status = 'Signing in...';
    },
    [AUTH_SIGNUP]: (state) => {
        state.status = 'Signing up...';
    },
    [LOGIN_SUCCESS]: (state, res) => {
        state.status = 'Login Success';
        state.token = res.data.token;
        state.user = res.data.user;
        state.hasLoadedOnce = true;
    },
    [SIGNUP_SUCCESS]: (state) => {
        state.status = 'Signup Success! We have sent you a confirmation email. Please, confirm your account!';
        state.signupSuccess = true;
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'Error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = '';
    },
    [ACCOUNT_CONFIRMATION]: (state) => {
        state.status = 'Confirming your account...'
    },
    [ACCOUNT_CONFIRMATION_SUCCESS]: (state) => {
        state.status = 'Your account confirmed! You can log in now';
        state.confirmed = true;
    },
    [ACCOUNT_CONFIRMATION_ERROR]: (state) => {
        state.status = 'Account Confirmation Error!';
    }
}
