<template>
    <body class="body">
        <slider>
            <slide><p>Slide 1</p></slide>
            <slide><p>Slide 2</p></slide>
            <slide><p>Slide 3</p></slide>
            <slide><p>Slide 4</p></slide>
        </slider>
    </body>
</template>

<script>

export default {
    name: "Main"
}
</script>

<style scoped>
    * {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }

    slider {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #1f1f1f;
        overflow: hidden;
        position: absolute;
    }

    slider > * {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        background: #1f1f1f;
        animation: slide 12s infinite;
        overflow: hidden;
    }

    slide:nth-child(1) {
        left: 0%;
        animation-delay: -1s;
        background-image: url(../assets/1.jpg);
        background-size: cover;
        background-position: center;
    }

    slide:nth-child(2) {
        animation-delay: 2s;
        background-image: url(../assets/2.jpg);
        background-size: cover;
        background-position: center;
    }

    slide:nth-child(3) {
        animation-delay: 5s;
        background-image: url(../assets/3.jpg);
        background-size: cover;
        background-position: center;
    }

    slide:nth-child(4) {
        left: 0%;
        animation-delay: 8s;
        background-image: url(../assets/4.jpg);
        background-size: cover;
        background-position: center;
    }

    slide p {
        font-family: Comfortaa;
        font-size: 70px;
        text-align: center;
        display: inline-block;
        width: 100%;
        margin-top: 340px;
        color: #fff;
    }

    @keyframes slide {
        0% {left: 100%; width: 100%;}
        5% {left: 0%;}
        25% {left: 0%;}
        30% {left: -100%; width: 100%}
        30.0001% { left: -100%; width: 0%;}
        100% {left: 100%; width: 0%;}
    }

    

    
</style>