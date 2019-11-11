<template>
    <div class="container">
        <div class="courses-header">
            <h2>Instructor Courses</h2>
        </div>
        <div class="courses-form-header">
            <router-link to="/instructor/course/create">
                <button class="add-course-btn">New Course</button>
            </router-link>
            <form class="courses-search-form" @submit="searchCourses">
                <input type="text" class="courses-search-input" placeholder="Search your courses">
                <button type="button" class="search-btn" @click="searchCourses">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="add-course-btn">Filter</button>
        </div>
        <div class="instructor-courses-list">
            <div v-bind:key="course.id" v-for="course in courses">
                <ICourseListItem v-bind:course="course"/>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import ICourseListItem from "@/views/instructor/ICourseListItem";

  export default {
    name: 'home',
    components: {
        ICourseListItem
    },
    data() {
      return {
        courses: []
      }
    },
    created() {
      this.getInstructorCourses();
    },
    methods: {
      searchCourses(e) {
        e.preventDefault();
      },
      getInstructorCourses() {
        const instructorID = this.user.id;
        const config = {
          headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
        };
        axios.get(`/api/instructor/${instructorID}/courses`, config)
          .then(res => {
            console.log(res.data);
            this.courses = res.data;
          })
          .catch(err => console.log(err))
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>

<style scoped>
    .container {
        font-family: open sans,helvetica neue,Helvetica,Arial,sans-serif;
        padding: 40px 50px;
        background-color: #edf2f5;
    }

    .courses-header {
        display: flex;
        margin-bottom: 25px;
    }

    .courses-form-header {
        display: flex;
        align-items: center;
        /*width: 60%;*/
        margin-bottom: 20px;
    }

    .add-course-btn {
        border-radius: 2px;
        background-color: #4CAF50; /* Green */
        border: none;
        padding: 12px 25px;
        text-align: center;
        text-decoration: none;
        color: white;
        font-size: 16px;
        font-weight: 500;
        list-style: none;
    }

    .add-course-btn:hover {
        background-color: #4CA333;
        cursor: pointer;
    }

    button:focus {
        outline: 0;
    }

    .courses-search-form {
        display: flex;
        align-items: center;
        margin-left: 5%;
        /*margin-left: 50px;*/
        /*background-color: #b6bdbf;*/
    }

    .courses-search-input {
        border: 1px solid #cacbcc;  /* #ebf3f5; #c7cdd1; */
        outline: none;
        border-radius: 2px;
        width: 300px;
        padding: 10px;
        font-size: 16px;
        color: #29303b;
    }

    .search-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        left: -36px;
        border: none;
        /*border: 1px solid #cacbcc;*/
        /*border-radius: 2px;*/
        width: 35px;
        height: 38px;
        background: #FFF;
        color: #EC9F42;
        outline: none;
    }

    .search-btn:hover {
        cursor: pointer;
    }

    .instructor-courses-list {
        /*background-color: #b6bdbf;*/
        /*padding: 10px;*/
    }

</style>
