<template>
  <div class="login">
    <h3>Sign In</h3>
    <form @submit="login">
      <input type="text" v-model="userName" placeholder="Username" required><br>
      <input type="password" v-model="password" placeholder="Password" required><br>
      <label for="usertype">User type</label> &nbsp;
      <select id="usertype" name="usertype" v-model="userType" required>
        <option value="2">Instructor</option>
        <option value="3">Student</option>
      </select> <br>
<!--      <button @click="login">Sign In</button>-->
      <input type="submit" class="signin-btn" value="Sign In">
      <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        password: '',
        userType: ''
      }
    },
    methods: {  // abylay.tastanbekov
      login(e) {
        e.preventDefault();
        console.log("login clicked"); // eslint-disable-line
        const url = 'http://localhost:8081/api/auth/login';
        const credentials = {
          userName: this.userName,
          password: this.password,
          userType: this.userType
        };
        axios.post(url, credentials)
          .then(res => {
            console.log(res);  // eslint-disable-line
            if (res.status === 200) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.userName); // JSON.stringify(res.data.user)
              this.$router.push("home");
            }
          })
          .catch(err => {
            console.log(err);  // eslint-disable-line
            console.log(err.response.data);  // eslint-disable-line
            console.log(err.response.status);  // eslint-disable-line
            console.log(err.response.statusText);  // eslint-disable-line
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