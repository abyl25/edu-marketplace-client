<template>
  <div class="sign-up">
    <div v-if="this.signupSuccess">
      <p>{{ authStatus }}</p>
    </div>
    <div v-if="!this.signupSuccess">
      <p>Let's create a new account !</p>
      <form @submit="signUp">
        <ul class="errors" v-if="errors">
          <li v-for="error in errors">
            {{ error }}
          </li>
        </ul>
        <input type="text" v-model="firstName" placeholder="First name" required><br>
        <input type="text" v-model="lastName" placeholder="Last name" required><br>
        <input type="text" v-model="email" placeholder="Email" required><br>
        <input type="text" v-model="userName" placeholder="Username" required><br>
        <input type="password" v-model="password" placeholder="Password" required><br>
        <label for="usertype">User type</label> &nbsp;
        <select id="usertype" name="usertype" v-model="userType" required>
          <option value="2">Instructor</option>
          <option value="3">Student</option>
        </select> <br>
<!--      <button @click="signUp">Sign Up</button>-->
        <input type="submit" value="Sign Up">
        <span>or go back to <router-link to="/login">login</router-link>.</span>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { AUTH_SIGNUP } from '../store/actions';

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
        errors: {}
      }
    },
    methods: {
      signUp(e) {
        e.preventDefault();
        console.log("sign up clicked"); // eslint-disable-line
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
          this.errors = err.response.data;
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
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>