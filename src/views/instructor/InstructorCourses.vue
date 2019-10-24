<template>
    <div>
        <h1>Courses</h1>
        <div>
            <div class="btn">
                <input type="text" placeholder="search your courses">
                <router-link to="/course/create" class="new-course-btn">New course</router-link>
            </div>
        </div>
        <div class="instructor-courses-list">
            <div>Course 1</div>
            <div>Course 2</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InstructorCourses"
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