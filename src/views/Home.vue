<template>
  <div class="home">
    <HelloWorld msg="Welcome to Dashboard"/>
<!--    <button @click="logout">Logout</button>-->
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

    }
  }
</script>
