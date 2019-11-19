<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header  from "@/components/layout/Header";

  export default {
    components: {
      Header
    },
    created() {
      console.log('mode: ' + process.env.NODE_ENV);
      console.log('api_endpoint: ' + process.env.VUE_APP_API);
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    line-height: 1.4;
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
