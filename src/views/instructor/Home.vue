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
            <select name="" id="filter" class="select" @change="applyFilter($event)">
                <option value="filter" selected>Sort</option>
                <option value="sort-1">A-Z</option>
                <option value="sort-2">Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
        <div v-if="!fetched">
            <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">
        </div>
        <transition name="fade">
            <div v-if="fetched" class="instructor-courses-list">
                <div v-bind:key="course.id" v-for="course in this.instrCourses">
                    <ICourseListItem v-bind:course="course"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ICourseListItem from "@/views/instructor/ICourseListItem";
import { INSTR_COURSES_REQUEST } from "@/store/actions";

export default {
    name: 'home',
    components: {
        ICourseListItem
    },
    data() {
        return {
            fetched: false,
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
            this.$store.dispatch(INSTR_COURSES_REQUEST, instructorID)
                .then(res => {
                    console.log(res.data);
                    this.fetched = true;
                })
                .catch(err => {
                    console.log(err);
                    this.fetched = true;
                });
        },
        applyFilter(e) {
            const selectedFilter = e.target.value;
            console.log(selectedFilter);
            if (selectedFilter === 'sort-1') {
                this.instrCourses.sort((a, b) => a.title.localeCompare(b.title));
            } else if (selectedFilter === 'sort-2') {
                this.instrCourses.sort((a, b) => b.title.localeCompare(a.title));
            } else if (selectedFilter === 'newest') {
                this.instrCourses.sort((a, b) => b.id - a.id);
            } else if (selectedFilter === 'oldest') {
                this.instrCourses.sort((a, b) => a.id - b.id);
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'isAuthenticated', 'instrCourses'])
    }
  }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active, .fade-leave-active {
        transition: opacity ease .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    /*  */
    .container {
        font-family: open sans,helvetica neue,Helvetica,Arial,sans-serif;
        padding: 40px 90px;
        /*background-color: #f0f3f5; !*  #edf2f5; #dadfe3;  *!*/
        background-color: #fff;  /*  #f5f6f7  */
    }

    .courses-header {
        display: flex;
        margin-bottom: 25px;
    }

    .courses-form-header {
        display: flex;
        align-items: center;
        /*width: 60%;*/
        margin-bottom: 40px;
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

    .select {
        display: block;
        height: 42px;
        width: 100px;
        padding: 5px 10px;
        border-radius: 2px;
        font-size: 16px;
        background: transparent;
        color: #6d736f;
        font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    }
    .select:hover {
        cursor: pointer;
    }

    .instructor-courses-list {
        /*background-color: #b6bdbf;*/
        /*padding: 10px;*/
    }


</style>
