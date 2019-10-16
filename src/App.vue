<template>
  <div id="app">
    <Header2 />  <!-- v-bind:values='passValues()' -->
    <router-view/>
  </div>
</template>

<script>
  import Header2  from "@/components/layout/Header2";

  export default {
    components: {
      Header2
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
