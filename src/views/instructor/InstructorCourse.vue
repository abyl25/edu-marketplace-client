<template>
    <div>
        <h1>Course</h1>
        <router-link :to="{ path: '/instructor/courses/' + this.$route.params.id + '/goals' }">Go to goals</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "InstructorCourses",
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .new-course-btn {
        display: inline-block;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 2px;
        padding: 10px;
        color: #fff;
        background-color: #ec5252;
        font-size: 15px;
        font-weight: 600;
    }
</style>