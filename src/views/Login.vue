<template>
  <div class="login">
    <h3>Sign In</h3>
    <form @submit="login">
      <ul v-if="errors">
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
      <input type="text" v-model="userName" placeholder="Username" ><br>
<!--      <span v-if="errors">Username is empty</span>-->
      <input type="password" v-model="password" placeholder="Password" ><br>
<!--      <span v-if="errors">Password is empty</span>-->

      <label for="usertype">User type</label> &nbsp;
      <select id="usertype" name="usertype" v-model="userType" >
        <option value="2">Instructor</option>
        <option value="3">Student</option>
      </select> <br>
      <input type="submit" class="signin-btn" value="Sign In">
      <p>You don't have an account ? You can <router-link to="/signup">Create one</router-link></p>
    </form>
  </div>
</template>

<script>
  import { AUTH_LOGIN } from '../store/actions';

  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        password: '',
        userType: '',
        errors: {}
      }
    },
    methods: {  // abylay.tastanbekov
      login(e) {
        e.preventDefault();
        console.log("login clicked"); // eslint-disable-line
        const credentials = {
          userName: this.userName,
          password: this.password,
          userType: this.userType
        };
        this.$store.dispatch(AUTH_LOGIN, credentials).then(() => {
          this.$router.push('/home')
        })
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
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>