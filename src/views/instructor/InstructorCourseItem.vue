<template>
    <div class="course-item">
        <img src="../../assets/1.png" alt="" width="200" height="120">
        <router-link to="/courses/1">
            <div class="course-card-right">
                <h3 class="title">{{ course.title }}</h3>
                <p>{{ course.text }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "InstructorCourseItem",
        props: ["course"]
    }
</script>

<style scoped>
    .course-item {
        display: flex;
        border: 1px solid rgba(41,48,59,.25);
        border-radius: 2px;
        margin: 30px 0;
        /*flex-basis: 200px;*/
        width: 65%;
    }

    .course-item a {
        display: block;
        flex: 1;
        text-align: left;
        text-decoration: none;
        color: #2c3e50;
    }

    .course-card-right {
        padding: 18px 15px 15px;
    }
</style>