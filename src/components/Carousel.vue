<template>
    <div>
        <div>
            <agile :initial-slide="0" :autoplay="false" :nav-buttons="true" :dots="true" :autoplay-speed="5000" :speed="1500" fade="fade" pause-on-dots-hover="pause-on-dots-hover">
                <div class="text-container">
                    <img class="slide" src="../assets/1.jpg"/>
<!--                start-learning-today.jpg <h1 class="image-text">Start learn today</h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/2.jpg"/>
<!--                everywhere.jpg <h1 class="image-text"></h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/3.jpg"/>
<!--                save-your-time.jpg <h1 class="image-text"></h1>-->
                </div>
                <div class="text-container">
                    <img class="slide" src="../assets/4.jpg"/>
<!--                get-online-degree.jpg <h1 class="image-text"></h1>-->
                </div>
                <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
                <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
            </agile>
        </div>
        <main-page-body/>
    </div>
</template>

<script>
    import { VueAgile } from 'vue-agile';
    import MainPageBody from "@/components/MainPageBody";

    export default {
        name: "Carousel",
        components: {
            agile: VueAgile,
            mainPageBody: MainPageBody
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
