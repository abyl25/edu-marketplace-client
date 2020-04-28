<template>
    <div class="course-container">
        <div v-if="fetched && courses.length === 0">
            <p>No course: {{ this.$route.query.q }}</p>
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
    import { SEARCH_COURSES_REQUEST } from '../../store/actions';

    export default {
        name: "SearchCourse",
        components: {
            CourseItem
        },
        computed: {
            ...mapGetters(['courses' , 'courseStatus', 'message'])
        },
        data() {
            return {
                fetched: false
            }
        },
        created() {
            let searchText = this.$route.query.q;
            this.$store.dispatch(SEARCH_COURSES_REQUEST, searchText)
                .then(res => {
                    this.fetched = true;
                })
                .catch(err => {
                    console.log(err);
                    this.fetched = true;
                });
        },
        watch: {
            $route(to, from) {
                let q = to.query.q;
                this.$store.dispatch(SEARCH_COURSES_REQUEST, q)
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
