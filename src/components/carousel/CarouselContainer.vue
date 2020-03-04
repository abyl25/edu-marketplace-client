<template>
    <div class="carousel-container">
        <carousel>
            <carousel-slide>
                <!-- <div class="slide-text">Slide 1</div>  -->
                <img class="slide-img" src="../../assets/1.png">
            </carousel-slide>
            <carousel-slide>
                <!-- <div class="slide-text">Slide 2</div> -->
                <img class="slide-img" src="../../assets/2.png">
            </carousel-slide>
            <carousel-slide>
                <!-- <div class="slide-text">Slide 3</div> -->
                <img class="slide-img" src="../../assets/3.png">
            </carousel-slide>
            <carousel-slide>
                <!-- <div class="slide-text">Slide 4</div> -->
                <img class="slide-img" src="../../assets/4.png">
            </carousel-slide>
        </carousel>
    </div>
</template>

<script>
import Carousel from "./Carousel"
import CarouselSlide from "./CarouselSlide"

export default {
  name: 'CarouselContainer',
  components: {
      Carousel,
      CarouselSlide
  }
}
</script>

<style>
    .slide-text {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        top: 50%;
        color: #fff;
        font-size: 16px;
     }

    .slide-img {
        height: 91vh;
        width: 100%;
        /*max-height: 91vh;*/
        /*max-width: 100%;*/
        /*width: 100vw;*/
        /*padding: 0;*/
        /*display: block;*/
        /*margin: 0 auto;*/
        /*height: auto;*/
        /*width: 100%;*/
        /*max-height: 100%;*/
        /*max-width: 100%;*/
    }
</style>
