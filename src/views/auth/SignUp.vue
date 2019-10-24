<template>
  <div class="sign-up">
    <div v-if="this.signupSuccess">
      <p class="auth-status">{{ authStatus }}</p>
    </div>
    <div v-if="!this.signupSuccess">
      <p>Let's create a new account !</p>
      <form @submit="signUp">
        <input type="text" v-model="firstName" placeholder="First name" ><br>  <!-- required -->
        <p v-if="firstNameError" class="error">{{ firstNameError }}</p>
        <input type="text" v-model="lastName" placeholder="Last name" ><br>
        <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
        <input type="text" v-model="email" placeholder="Email" ><br>
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <input type="text" v-model="userName" placeholder="Username" ><br>
        <p v-if="usernameError" class="error">{{ usernameError }}</p>
        <input type="password" v-model="password" placeholder="Password" ><br>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <div class="user-type">
          <label for="usertype">User type</label> &nbsp;
          <select id="usertype" name="usertype" v-model="userType" >
            <option value="2">Instructor</option>
            <option value="3">Student</option>
          </select> <br>
        </div>
        <input type="submit" class="signup-btn" value="Sign Up">
        <span>or go back to <router-link to="/login">Login</router-link>.</span>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { AUTH_SIGNUP } from '../../store/actions';

  export default {
    name: 'SignUp',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        userType: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        usernameError: '',
        passwordError: ''
      }
    },
    methods: {
      signUp(e) {
        e.preventDefault();
        const credentials = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          userName: this.userName,
          password: this.password,
          userType: this.userType
        };
        this.$store.dispatch(AUTH_SIGNUP, credentials).then(() => {
          // this.$router.push('/')
        }).catch(err => {
          this.firstNameError = '';
          this.lastNameError = '';
          this.emailError = '';
          this.usernameError = '';
          this.passwordError = '';
          let data = err.response.data;
          console.log(data);

          if (data === 'Username is already in use') {
            this.usernameError = data;
          }
          if (data.hasOwnProperty("errors")) {
            if (data.errors.firstName) {
              this.firstNameError = data.errors.firstName;
            }
            if (data.errors.lastName) {
              this.lastNameError = data.errors.lastName;
            }
            if (data.errors.email) {
              this.emailError = data.errors.email;
            }
            if (data.errors.userName) {
              this.usernameError = data.errors.userName;
            }
            if (data.errors.password) {
              this.passwordError = data.errors.password;
            }
          }
        });
      }
    },
    computed: {
        ...mapGetters(['authStatus', 'signupSuccess']),
        // ...mapState({
        //     signupSuccess: state => state.signupSuccess
        // })
    },
    updated() {
        // console.log('updated:'); // eslint-disable-line no-console
        // console.log('authStatus: ' + this.authStatus); // eslint-disable-line no-console
        // console.log('signupSuccess: ' + this.signupSuccess); // eslint-disable-line no-console
    }
  }
</script>

<style scoped>
   .auth-status {
     color: green;
   }
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  .signup-btn {
    font-size: 15px;
    margin-top: 10px;
    width: 20%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
  .user-type {
    margin-top: 10px;
  }
  .error {
    color: red;
    font-size: 13px;
  }

</style>