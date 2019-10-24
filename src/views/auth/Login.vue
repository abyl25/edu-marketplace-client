<template>
  <div class="login">
    <h3>Sign In</h3>
    <form @submit="login">
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
      <input type="submit" class="signin-btn" value="Sign In">
      <p class="acc">You don't have an account ? You can <router-link to="/signup">Create one</router-link></p>
    </form>
  </div>
</template>

<script>
  import { AUTH_LOGIN } from '../../store/actions';

  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        password: '',
        userType: '',
        usernameError: '',
        passwordError: ''
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
          this.$router.push('home');
        }).catch(err => {
          this.usernameError = '';
          this.passwordError = '';
          let data = err.response.data;
          console.log(data);

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
</style>