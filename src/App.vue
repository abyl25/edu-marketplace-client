<template>
  <div id="app">
<!--    <Header/>-->
    <NewHeader/>
    <div class="body">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "@/components/layout/Header";
  import NewHeader from "@/components/layout/NewHeader";
  import Footer from "@/components/layout/Footer";
  import "vue-navigation-bar/dist/vue-navigation-bar.css";

  export default {
    components: {
      Header,
      NewHeader,
      Footer
    },
    data() {
      return {
        activeInstrument: 'Piano',
        instruments: [
          'Piano',
          'Acoustic Guitar',
          'Drums',
          'Trumpet'
        ]
      }
    },
    methods: {
      changeInstrument: function(instrument) {
        this.activeInstrument = instrument;
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    line-height: 1.4;
    box-sizing: border-box;
  }
  html {
  }
  body {
    /*width: calc(100vw - 34px);*/
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  .body {
      min-height: 100vh;
  }

  /* scrollbar */
  ::-webkit-scrollbar {
      width: 10px;
  }
  ::-webkit-scrollbar-track {
      /*border-radius: 8px;*/
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: darkgrey;
      outline: 1px solid slategrey;
  }
  /*::-webkit-scrollbar-button {*/
  /*    width: 10px;*/
  /*    height: 10px;*/
  /*    background-color: #fff;*/
  /*}*/
  /*::-webkit-scrollbar-button:hover {*/
  /*    background-color: #e8e3e3;*/
  /*}*/

  /* Pagination Component style */
  .pagination {
    display: flex;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    list-style: none;
  }
  .pagination > li:first-child > a, .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .pagination > li > a, .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover,
  .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus,
  .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
</style>
