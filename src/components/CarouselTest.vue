<template>
  <div id="app">
    <agile :initial-slide="3" :autoplay="true" :navButtons="false" :dots="false" :speed="400">
      <img
        class="slide"
        src="../assets/1.png"
      />
      <img
        class="slide"
        src="../assets/2.png"
      />
      <img
        class="slide"
        src="../assets/3.png"
      />
      <img
        class="slide"
        src="../assets/4.png"
      />
      <template slot="prevButton">
        <i class="fas fa-chevron-left"></i>
      </template>
      <template slot="nextButton">
        <i class="fas fa-chevron-right"></i>
      </template>
    </agile>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css"></script>
<script>
import { VueAgile } from 'vue-agile'

export default {
  name: 'CarouselTest',
  components: {
    agile: VueAgile
  }
};
</script>

<style scoped>
.agile__nav-button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  height: 100%;
  position: absolute;
  top: 0;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  width: 80px;
}
.agile__nav-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
.agile__nav-button--prev {
  left: 0;
}
.agile__nav-button--next {
  right: 0;
}
.agile__dots {
  bottom: 10px;
  left: 50%;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #fff;
}

.slide {
  display: block;
  height: 500px;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
}

@media (max-width: 420px){
.slide {
    height: 300px;
}
}
</style>