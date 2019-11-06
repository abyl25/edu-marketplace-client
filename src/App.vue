<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header  from "@/components/layout/Header";
  import { AUTH_LOGOUT } from './store/actions';
  import axios from 'axios';

  export default {
    components: {
      Header
    },
    created() {
      axios.interceptors.response.use(resp => resp, err => {
        return new Promise(function (resolve, reject) {
          if (err.response.status === 401) {
            this.$store.dispatch(AUTH_LOGOUT);
          }
          return reject(err);
        });
      });
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
