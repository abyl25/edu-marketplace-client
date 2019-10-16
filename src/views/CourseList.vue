<template>
    <div class="course-container">
        <div v-bind:key="course.id" v-for = "course in courses">
            <CourseItem v-bind:course="course"/>
        </div>
    </div>
</template>

<script>
import CourseItem from './CourseItem';
import axios from 'axios';

export default {
    name: "CourseList",
    components: {
        CourseItem
    },
    data() {
        return {
            courses: []
        }
    },
    created() {
        console.log(this.$route.params.cat);
        console.log(this.$route.params.subcat);
        axios.get('http://localhost:8081/api/courses')
            .then(res => {
                console.log(res.data);
                this.courses = res.data
            })
            .catch(err => console.log(err));
    },
    // updated() {
    //     console.log(this.$route.params.cat);
    //     console.log(this.$route.params.subcat);
    // },
    // beforeUpdate() {
    //     console.log(this.$route.params.cat);
    //     console.log(this.$route.params.subcat);
    // }

}
</script>

<style scoped>
    .course-container {
        padding-top: 10px; 
        padding-left: 10%;
        width: 80%;
    }
</style>