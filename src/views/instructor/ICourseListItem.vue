<template>
    <div class="course-item">
        <img src="../../assets/1.png" alt="" v-if="!hasImage" width="180" height="120">
        <img :src="'http://37.18.30.105:6600/upload_images/' + course.image_name + '.png'" alt="" v-else width="180" height="120">
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
                return this.course.image_name;
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
        width: 80%;
    }

    .course-item a {
        display: block;
        flex: 1;
        text-align: left;
        text-decoration: none;
        background-color: #f5f6f7;
        color: #2c3e50;
    }

    .course-card-right {
        padding: 10px 15px;
    }

    .title-wrapper {
        min-width: 0;
        height: 26px;
        /*white-space: nowrap;*/
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .title {
        /*text-overflow: ellipsis;*/
    }

    .subtitle-wrapper {
        /*height: 26px;*/
    }
</style>