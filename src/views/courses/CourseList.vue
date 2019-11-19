<template>
    <div class="course-container">
        <div v-if="!fetched">
            <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">
        </div>
        <div v-if="fetched && courses.length === 0">
            <p>No courses</p>
        </div>
        <div v-if="message">
            <p>{{ message }}</p>
        </div>
        <div v-bind:key="course.id" v-for="course in this.courses">
            <CourseItem v-bind:course="course"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { COURSES_REQUEST } from "@/store/actions";
import CourseItem from './CourseItem';

export default {
    name: "CourseList",
    components: {
        CourseItem
    },
    data() {
        return {
            fetched: false,
            message: ''
        }
    },
    created() {
        console.log('CourseList created');
        let { category, subcategory } = this.$route.params;
        if (subcategory === undefined) {
            this.getCoursesByCategory(category);
        } else {
            this.getCoursesBySubCategory(category, subcategory);
        }
    },
    methods: {
        getCoursesByCategory(category) {
            const payload = {
                category: category
            };
            this.$store.dispatch(COURSES_REQUEST, payload)
                .then(res => {
                    console.log(res.data);
                    this.fetched = true;
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                    if (err.response.status === 404) {
                        this.message = err.response.data;
                        this.fetched = true;
                    }
                });
        },
        getCoursesBySubCategory(category, subcategory) {
            const payload = {
                category, subcategory
            };
            this.$store.dispatch(COURSES_REQUEST, payload)
                .then(res => {
                    console.log(res.data);
                    this.fetched = true;
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                    if (err.response.status === 404) {
                        this.message = err.response.data;
                        this.fetched = true;
                    }
                });
        }
    },
    watch: {
        $route(to, from) {
            let { category, subcategory } = to.params;
            if (subcategory === undefined) {
                this.getCoursesByCategory(category);
            } else {
                this.getCoursesBySubCategory(category, subcategory);
            }
        }
    },
    computed: {
        ...mapGetters(['courses'])
    }

}
</script>

<style scoped>
    .course-container {
        margin: 30px auto;
        /*padding-top: 10px; */
        /*padding-left: 10%;*/
        width: 80%;
    }
</style>