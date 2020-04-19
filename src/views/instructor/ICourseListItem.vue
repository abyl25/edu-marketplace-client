<template>
    <div class="course-item">
        <div class="image-container">
            <img src="../../assets/1.png" alt="" class="default-logo" v-if="!hasImage">
            <img :src="imagePath" alt="logo" class="course-logo" v-else>
        </div>
        <router-link :to="{ path: '/instructor/course/' + course.id + '/main' }">
            <div class="course-card-right">
                <div class="title-wrapper">
                    <h3 class="title">{{ course.title }}</h3>
                </div>
                <div class="subtitle-wrapper">
                    <p style="margin-top: 10px">{{ course.subtitle }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ICourseListItem",
        props: ["course"],
        computed: {
            hasImage() {
                return this.course.imageName;
            },
            imagePath() {
                return `${process.env.VUE_APP_API}/${this.course.title}/logo/${this.course.imageName}.${this.course.imageFormat}`;
            }
        }
    }
</script>

<style scoped>
    .course-item {
        display: flex;
        border: 1px solid rgba(41,48,59,.25);
        border-radius: 2px;
        margin: 30px 0;
        /*flex-basis: 200px;*/
        /*width: 90%;*/
        min-width: 430px;
    }

    .image-container {
        /*min-width: 120px;*/
        width: 170px;
        height: 120px;
    }
    .default-logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .course-logo {
        max-width: 100%;
        max-height: 100%;
        /* or */
        /*width: 100%;*/
        /*height: 100%;*/
        /*object-fit: contain; !*  cover; contain;  *!*/
    }

    .course-item a {
        display: block;
        flex: 1;
        min-width: 0;
        /*min-width: 300px;*/
        text-align: left;
        text-decoration: none;
        background-color: #f5f6f7;
        color: #2c3e50;
    }

    .course-card-right {
        display: flex;
        flex-direction: column;
        min-width: 280px;
        padding: 10px 15px;
    }

    .title-wrapper {
        height: 26px;
    }
    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .subtitle-wrapper {
        /*height: 26px;*/
    }
</style>
