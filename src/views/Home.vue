<template>
  <div class="home">
    <HelloWorld msg="Welcome to Dashboard"/>
    <h4>{{ username }}</h4>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data() {
      return {
        username: localStorage.getItem("username")
      }
    },
    methods: {
      logout: function() {
        console.log("logout clicked"); // eslint-disable-line
        // localStorage.removeItem("token");
        localStorage.clear();
        this.$router.push('login');
      }
    }
  }
</script>
