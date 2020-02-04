<template>
    <div class="course-container">
        <div v-if="!fetched">
            <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">
        </div>
        <transition name="fade">
            <div v-if="fetched">
                <div v-if="courses.length === 0"><h4>No Courses</h4></div>
                <div v-if="courses.length === 1"><h4>1 Course</h4></div>
                <div v-if="courses.length > 1" class="sort-container">
                    <select name="" id="filter" class="select" @change="applyFilter($event)">
                        <option value="sort" selected>Sort</option>
                        <option value="sort-1">A-Z</option>
                        <option value="sort-2">Z-A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="highest-price">Highest Price</option>
                        <option value="lowest-price">Lowest Price</option>
                    </select>
                    <h4 class="courses-count">{{ this.courses.length }} Courses</h4>
                </div>
                <div v-bind:key="course.id" v-for="course in this.courses">
                    <CourseItem v-bind:course="course"/>
                </div>
                <paginate
                        v-model="selectedPage"
                        :page-count="count"
                        :click-handler="getCoursesByPage"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'">
                </paginate>
            </div>
        </transition>
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
            message: '',
            count: 0,
            selectedPage: 1,
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
                    this.fetched = true;
                    console.log(err);
                    console.log(err.response.data);
                    if (err.response.status === 404) {
                        this.message = err.response.data;
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
                    this.fetched = true;
                    console.log(err);
                    console.log(err.response.data);
                    if (err.response.status === 404) {
                        this.message = err.response.data;
                    }
                });
        },
        getCoursesByPage(pageNum) {
        },
        applyFilter(e) {
            const selectedFilter = e.target.value;
            console.log(selectedFilter);
            if (selectedFilter === 'sort-1') {
                this.courses.sort((a, b) => a.title.localeCompare(b.title));
            } else if (selectedFilter === 'sort-2') {
                this.courses.sort((a, b) => b.title.localeCompare(a.title));
            } else if (selectedFilter === 'newest') {
                this.courses.sort((a, b) => b.id - a.id);
            } else if (selectedFilter === 'oldest') {
                this.courses.sort((a, b) => a.id - b.id);
            } else if (selectedFilter === 'highest-price') {
                this.courses.sort((a, b) => b.price - a.price);
            } else if (selectedFilter === 'lowest-price') {
                this.courses.sort((a, b) => a.price - b.price);
            }
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
        ...mapGetters(['courses']),
        coursesLength() {
            return this.courses.length;
        },
        pageCount() {
            return Math.ceil(this.courses.length/10);
        }
    }

}
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active, .fade-leave-active {
        transition: opacity ease .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    /*  */
    .course-container {
        margin: 30px auto;
        width: 80%;
    }

    .sort-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 15px 20px 15px 10px;
        border-bottom: 1px solid #d7dedc;
    }

    .select {
        display: block;
        height: 35px;
        width: 130px;
        padding-left: 5px;
        /*outline: none;*/
        /*border: none;*/
        border-radius: 2px;
        font-size: 16px;
        background: transparent;
        color: #6d736f;
        font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    }
    .select:hover {
        cursor: pointer;
    }

    .courses-count {
        text-align: left;
    }

</style>
