<template>
    <div class="video-player">
        <vue-plyr>
            <video poster="poster.png" src="https://vs2.coursehunter.net/udemy-ru-react-redux/lesson1.mp4">
<!--            <video poster="../assets/1.png" src="../assets/lesson1.mp4">-->
<!--                <source src="https://vs2.coursehunter.net/udemy-ru-react-redux/lesson1.mp4" type="video/mp4" size="720">-->
    <!--            <source src="video-1080p.mp4" type="video/mp4" size="1080">-->
    <!--            <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>-->
            </video>
        </vue-plyr>
    </div>
</template>

<script>
    export default {
        name: "LearnPage"
    }
</script>

<style scoped>
    .video-player {
        width: 700px;
        height: 500px;
    }
</style>
