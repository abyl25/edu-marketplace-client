<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "@/components/layout/Header";
  import "vue-navigation-bar/dist/vue-navigation-bar.css";

  export default {
    components: {
      Header,
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
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  /* .ant-dropdown-menu-item */
  .QWERTY {
    width: 120px;
    font-size: 17px;
  }

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
