<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <form @submit="signUp">
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
</template>

 <script>
  import axios from 'axios';

  export default {
    name: 'SignUp',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        userType: ''
      }
    },
    methods: {
      signUp(e) {
        e.preventDefault();
        console.log("sign up clicked"); // eslint-disable-line
        const url = 'http://localhost:8081/api/auth/signup';
        const credentials = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          userName: this.userName,
          password: this.password,
          userType: this.userType
        };
        console.log(credentials); // eslint-disable-line
        axios.post(url, credentials)
          .then(res => {
            console.log(res); // eslint-disable-line
            if (res.status === 200) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.userName);  // localStorage.setItem("user", JSON.stringify(res.data.user));
              this.$router.push("home");
            }
          })
          .catch(err => {
              console.log(err); // eslint-disable-line
              console.log(err.response.data);  // eslint-disable-line
              console.log(err.response.status);  // eslint-disable-line
          });

      }
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