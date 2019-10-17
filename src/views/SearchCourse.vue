<template>
    <div class="course-container">
        <div v-if="fetched && courses.length === 0">
            <p>No courses</p>
        </div>
        <div v-if="message">
            <p>{{ message }}</p>
        </div>
        <div v-bind:key="course.id" v-for = "course in courses">
            <CourseItem v-bind:course="course"/>
        </div>
    </div>
</template>

<script>
    import CourseItem from './CourseItem';
    import { mapGetters } from 'vuex';
    import { COURSES_REQUEST } from '../store/actions';

    export default {
        name: "SearchCourse",
        components: {
            CourseItem
        },
        computed: {
            ...mapGetters(['courses' , 'courseStatus', 'fetched', 'message'])
        },
        created() {
            let searchText = this.$route.query.q;
            this.$store.dispatch(COURSES_REQUEST, searchText)
                .then()
                .catch(err => console.log(err));
        },
        watch: {
            $route(to, from) {
                let q = to.query.q;
                this.$store.dispatch(COURSES_REQUEST, q)
                    .then()
                    .catch(err => console.log(err));
            }
        },
    }
</script>

<style scoped>
    .course-container {
        margin: 30px auto;
        width: 80%;
    }
</style>