<template>
  <div class="login">
    <h3>Sign In</h3>
    <p v-if="confirmError" class="confirm-error">{{ confirmError }}</p>
    <form @submit="login">
      <input type="text" v-model="userName" placeholder="Username" ><br>
      <p v-if="usernameError" class="error">{{ usernameError }}</p>
      <input type="password" v-model="password" placeholder="Password" ><br>
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
      <input type="submit" class="signin-btn" value="Sign In">
      <p class="acc">You don't have an account ? You can <router-link to="/signup">Create one</router-link></p>
    </form>
  </div>
</template>

<script>
  import { AUTH_LOGIN } from '../../store/actions';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        password: '',
        userType: '',
        usernameError: '',
        passwordError: '',
        confirmError: ''
      }
    },
    methods: {
      login(e) {
        e.preventDefault();
        const credentials = {
          userName: this.userName,
          password: this.password,
          userType: this.userType
        };
        this.$store.dispatch(AUTH_LOGIN, credentials).then(() => {
          let role = this.user.roles[0];
          if (role.name === 'Instructor') {
            this.$router.push('/instructor/home');
          } else if (role.name === 'Student') {
            this.$router.push('/student/home');
          } else if (role.name === 'Admin'){
            this.$router.push('/admin/home');
          }
        }).catch(err => {
          this.usernameError = '';
          this.passwordError = '';
          let data = err.response.data;
          console.log(data);
          if (data === 'You haven\'t confirmed your account yet. Please, do it by an email we have sent you') {
            this.confirmError = data;
          }
          if (data === 'Username not found') {
            this.usernameError = data;
          } else if (data === 'Invalid username or password') {
            this.passwordError = 'Incorrect password';
          }
          if (data.hasOwnProperty("errors")) {
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
      ...mapGetters(['user', 'isInstructor', 'homePage'])
    }

  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {
    /*border-radius: 1px;*/
    margin: 10px 0;
    width: 20%;
    padding: 10px 15px;
  }
  .signin-btn {
    font-size: 15px;
    /*font-weight: 600;*/
    margin-top: 20px;
    width: 10%;
    /*background-color: #54c3e8;*/
    cursor: pointer;
  }
  .acc {
    margin-top: 40px;
    font-size: 13px;
  }
  .acc a {
    text-decoration: underline;
    cursor: pointer;
  }
  .user-type {
    margin-top: 10px;
  }
  .error {
    color: red;
    font-size: 13px;
  }
  .confirm-error {
    margin: 10px 0;
    color: red;
  }
</style>