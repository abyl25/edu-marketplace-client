<template>
    <div>
        <div>
            <agile :initial-slide="0" :autoplay="false" :nav-buttons="true" :dots="true" :autoplay-speed="5000" :speed="1500" fade="fade" pause-on-dots-hover="pause-on-dots-hover">
                <div class="text-container">
                    <img class="slide" src="../assets/5.jpg"/>
<!--                    <h1 class="image-text">Start learn today</h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/6.jpg"/>
<!--                    <h1 class="image-text"></h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/7.jpg"/>
<!--                    <h1 class="image-text"></h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/8.jpg"/>
<!--                    <h1 class="image-text"></h1>-->
                </div>
                <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
                <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
            </agile>
        </div>
    </div>
</template>

<script>
    import { VueAgile } from 'vue-agile';
    // import 'vue-agile/dist/VueAgile.css';

    export default {
        name: "Carousel",
        components: {
            agile: VueAgile
        }
    }
</script>

<style scoped>
    .slide {
        display: block;
        height: 580px;
        -o-object-fit: cover;
        object-fit: cover;
        width: 100%;
    }

    .text-container {
        position: relative;
        text-align: center;
        color: white;
    }
    .image-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
    }

</style>
