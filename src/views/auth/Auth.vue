<template>
    <div class="wrapper" :class="{ wrapper2: authIndex === 2 }">
        <div class="login-wrap" :class="{ signUpWrap: authIndex === 2 }">
            <div class="login-form">
                <div class="auth-header">
                    <p class="tab" @click="setAuthTab(1)" :class="{ activeAuthTab: authIndex === 1 }">Sign In</p>
                    <p class="tab" @click="setAuthTab(2)" :class="{ activeAuthTab: authIndex === 2 }">Sign Up</p>
                </div>
                <template v-if="this.signupSuccess">
                    <p class="auth-status">{{ authStatus }}</p>
                </template>
                <template v-else>
                    <!-- Login Form  -->
                    <form class="form" v-if="authIndex === 1" @submit="login">
                        <p v-if="confirmError" class="confirm-error">{{ confirmError }}</p>
                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="user" type="text" class="input" placeholder="Username" v-model="userName">
                            <p v-if="usernameError" class="error">{{ usernameError }}</p>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('userName')" class="error">{{ errors.userName }} </p>
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password"  v-model="password" placeholder="Password">
                            <p v-if="passwordError" class="error">{{ passwordError }}</p>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('password')" class="error">{{ errors.password }} </p>
                        </div>
                        <div class="group">
                            <button type="button" class="button" :class="logging?'logging':''" @click="login">
                                <span v-if="!logging">Sign In</span>
                                <span class="lds-dual-ring" v-if="logging"></span>
                            </button> <!--   -->
                        </div>
                    </form>

                    <!-- Sign Up Form  -->
                    <form class="form" v-if="authIndex === 2" @submit="signUp">
                        <div class="group">
    <!--                        <label for="firstName" class="label">First Name</label>-->
                            <input id="firstName" type="text" class="input" placeholder="First Name" v-model="firstName">
<!--                            <p v-if="firstNameError" class="error">{{ firstNameError }}</p>-->
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('firstName')" class="error">{{ errors.firstName }} </p>
                        </div>
                        <div class="group">
    <!--                        <label for="lastName" class="label">Last Name</label>-->
                            <input id="lastName" type="text" class="input" placeholder="Last Name" v-model="lastName">
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('lastName')" class="error">{{ errors.lastName }} </p>
                        </div>
                        <div class="group">
    <!--                        <label for="email" class="label">Email</label>-->
                            <input id="email" type="text" class="input" placeholder="Email" v-model="email">
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('email')" class="error">{{ errors.email }} </p>
                        </div>
                        <div class="group">
    <!--                        <label for="user" class="label">Username</label>-->
                            <input id="user" type="text" class="input" placeholder="Username" v-model="userName">
                            <p v-if="usernameError" class="error">{{ usernameError }}</p>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('userName')" class="error">{{ errors.userName }} </p>
                        </div>
                        <div class="group">
    <!--                        <label for="pass" class="label">Password</label>-->
                            <input id="pass" type="password" class="input" placeholder="Password" v-model="password" >
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('password')" class="error">{{ errors.password }} </p>
                        </div>
                        <div class="group">
                            <label for="user-type" class="label1">User Role</label> &nbsp;
                            <select id="user-type" name="userType" v-model="userType" >
                                <option value="2">Instructor</option>
                                <option value="3">Student</option>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('userType')" class="error">{{ errors.userType }} </p>
                        </div>
                        <div class="group">
<!--                            <input type="button" class="button" value="Sign Up" @click="signUp"> -->
                            <button type="button" class="button" :class="logging?'logging':''" @click="login">
                                <span v-if="!logging">Sign Up</span>
                                <span class="lds-dual-ring" v-if="logging"></span>
                            </button>
                        </div>
                    </form>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    /* New Page Component with both Login and SignUp functionality. Replaces previous Login and SignUp Page Components  */
    import {AUTH_LOGIN, AUTH_SIGNUP} from "@/store/actions";
    import {mapGetters} from "vuex";

    export default {
        name: "Auth",
        notifications: {
            showToast: {
                title: 'Success',
                message: 'Auth success!',
                type: 'success',
                timeout: 2000
            }
        },
        data() {
            return {
                logging: false, // false true
                authIndex: 1,
                firstName: '',
                lastName: '',
                email: '',
                userName: '',
                password: '',
                userType: '',
                errors: {},
                usernameError: '',
                passwordError: '',
                confirmError: ''
            }
        },
        computed: {
            ...mapGetters(['user', 'isInstructor', 'homePage', 'authStatus', 'signupSuccess'])
        },
        updated() {
            this.authIndex = parseInt(localStorage.getItem('authTab')) || 1;
        },
        methods: {
            resetErrorFields() {
                this.errors = {};
                this.usernameError = '';
                this.passwordError = '';
                this.confirmError = '';
            },
            setAuthTab(index) {
                this.authIndex = index;
                localStorage.setItem('authTab', index);
                this.resetErrorFields();
            },
            login(e) {
                e.preventDefault();
                this.logging = true;
                const credentials = {
                    userName: this.userName.trim(),
                    password: this.password.trim(),
                    userType: this.userType.trim()
                };
                this.$store.dispatch(AUTH_LOGIN, credentials).then(() => {
                    this.showToast({
                        title: 'Login Success',
                        message: '',
                        type: 'success',
                        timeout: 1000
                    });
                    const redirect = this.$route.query.redirect;
                    if (redirect) {
                        this.$router.push(redirect);
                        return;
                    }
                    let role = this.user.roles[0];
                    if (role.name === 'Instructor') {
                        this.$router.push('/instructor/home');
                    } else if (role.name === 'Student') {
                        this.$router.push('/');
                    } else if (role.name === 'Admin'){
                        this.$router.push('/admin/home');
                    }
                    this.logging = false;
                }).catch(err => {
                    console.log(err);
                    this.logging = false;
                    if (err.response) {
                        let data = err.response.data;
                        console.log(data);
                        this.usernameError = '';
                        this.passwordError = '';
                        if (typeof data === 'object' && data.hasOwnProperty('errors')) {
                            this.errors = err.response.data.errors;
                        } else {
                            this.errors = {};
                            if (data === 'You haven\'t confirmed your account yet. Please, do it by an email we have sent you') {
                                this.confirmError = data;
                            }
                            if (data === 'Username not found') {
                                this.usernameError = data;
                            } else if (data === 'Invalid username or password') {
                                this.passwordError = 'Incorrect password';
                            }
                        }
                        this.showToast({
                            title: 'Login Failure',
                            message: '',
                            type: 'error',
                            timeout: 2000
                        });
                    } else {
                        console.log('Connection Error');
                        this.showToast({
                            title: 'Server connection error',
                            message: '',
                            type: 'error',
                            timeout: 2000
                        });
                    }
                });
            },
            signUp(e) {
                e.preventDefault();
                this.logging = true;
                const credentials = {
                    firstName: this.firstName.trim(),
                    lastName: this.lastName.trim(),
                    email: this.email.trim(),
                    userName: this.userName.trim(),
                    password: this.password.trim(),
                    userType: this.userType ? this.userType : null  // parseInt()
                };
                console.log(credentials);
                this.$store.dispatch(AUTH_SIGNUP, credentials).then(() => {
                    // this.$router.push('/')
                    this.showToast({
                        title: 'Signup Success',
                        message: '',
                        type: 'success',
                        timeout: 2000
                    });
                    this.logging = false;
                }).catch(err => {
                    console.log(err);
                    this.logging = false;
                    if (err.response) {
                        let data = err.response.data;
                        console.log(data);
                        this.usernameError = '';
                        if (typeof data === 'object' && data.hasOwnProperty('errors')) {
                            this.errors = err.response.data.errors;
                        } else {
                            this.errors = {};
                            if (data === 'Username is already in use') {
                                this.usernameError = data;
                            }
                        }
                        this.showToast({
                            title: 'Signup Failure',
                            message: '',
                            type: 'error',
                            timeout: 2000
                        });
                    } else {
                        console.log('Connection Error');
                        this.showToast({
                            title: 'Server connection error',
                            message: '',
                            type: 'error',
                            timeout: 2000
                        });
                    }
                });
            },
            isObjEmpty(myObj) {
                return Object.entries(myObj).length === 0 && myObj.constructor === Object
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 90.6vh;
        margin: 0;
        color: #6a6f8c;  /*  #6a6f8c;  */
        background: #d4d4d4;  /*  #c8c8c8;  */
        font: 600 16px/18px 'Open Sans',sans-serif;
    }
    .login-wrap {
        position: relative;
        top: 40px;
        width: 100%;
        margin: auto;
        max-width: 525px;
        min-height: 430px;
        box-shadow: 0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
        color: #6a6f8c;
        background: #c8c8c8;
    }
    .wrapper2 {
        height: 115vh;
        padding-left: calc(100vw - 100%);
    }
    .signUpWrap {
        min-height: 660px;
    }
    .login-form {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 40px 70px 50px 70px;
        background: rgba(40,57,101,.9);
        border-radius: 5px;
    }
    .auth-header {
        margin-bottom: 20px;
    }
    .tab {
        text-decoration: none;
        font-size: 22px;
        padding-bottom:5px;
        margin-right: 15px;
        display: inline-block;
        border-bottom: 2px solid #fff;
        text-transform: uppercase;
        color: #fff;  /* #98ccfa; */
        cursor: pointer;
        user-select: none;
    }
    .activeAuthTab {
        /*color: #fff;*/
        border-color: #1161ee;
    }
    .group {
        margin-bottom: 15px;
    }
    .group:last-child{
        margin-top: 30px;
    }
    /*    */
    .label, .button {
        text-transform: uppercase;
    }
    .label, .input, .button {
        width: 100%;
        color: #fff;
        display: block;
    }
    .input, .button {
        border: none;
        padding: 15px 20px;
        border-radius: 25px;
        background: rgba(226, 226, 226, 1);  /* rgba(255,255,255,.1) */
        outline: none;
    }
    .label {
        margin-bottom: 5px;
        color: #cfcccc;
        font-size: 13px;
        /*text-align: left;*/
    }
    #user-type {
        width: 70%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 15px;
        resize: vertical;
        outline: none;
        cursor: pointer;
    }
    .label1 {
        color: #cfcccc;
        font-size: 14px;
    }
    .input {
        font-size: 15px;
        color: #3b3a3a;
    }
    .button {
        background:#1161ee;
        cursor: pointer;
    }

    .logging {
        padding: 9px;
        background: #3677ea;
        cursor: wait; /*  not-allowed  */
    }

    /* login spinner */
    .lds-dual-ring {
        display: inline-block;
        width: 25px;
        height: 25px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px; /* 64px, 64px */
        height: 20px;
        /*margin: 8px;*/
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error {
        /*margin-top: 5px;*/
        color: #ff3d3d;
        font-size: 13px;
    }
    .confirm-error {
        margin: 10px 0;
        color: #f55f5f;  /* #e84a4a;  */
    }
</style>
