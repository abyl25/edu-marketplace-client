<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

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
<script>
  import Header from "@/components/layout/Header";

  export default {
    components: {
      Header
    }
  }
</script>