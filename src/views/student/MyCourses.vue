<template>
    <div>
        <div class="header">
            <h2 class="header-title">My Courses</h2>
        </div>
        <div v-if="!fetched">
            <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">
        </div>
        <transition name="fade">
            <div v-if="fetched" class="my-courses-container">
                <div class="card-wrapper">
                    <div class="course-card" v-bind:key="course.id" v-for="course in this.myCourses"> <!--  i in count  -->
                        <router-link :to="{ path: `/course/${course.id}/lecture/1` }" class="course-link">
                            <div class="image-container">
                                <img class="image" src="../../assets/1.png" alt="" v-if="!course.imageName">
                                <img :src="imagePath(course)" alt="logo" v-else width="150" height="120">
                            </div>
                            <div class="course-details">
                                <p class="course-title">{{ course.title }}</p>
    <!--                            <p class="course-title">Python eCommerce | Build a Django eCommerce Web Application | Justin Mitchell</p>-->
                                <div class="details-instructor">
                                    <p>{{ course.instructor.firstName + ' ' + course.instructor.lastName }}</p>
    <!--                                <p>Justin Mitchell</p>-->
                                </div>
                                <div class="details-bottom">
                                    <span class="details-progress"></span>
                                    <span class="details__start-course">START COURSE</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { MY_COURSES_REQUEST } from "@/store/actions";
    import { mapGetters } from "vuex";

    export default {
        name: "MyCourses",
        data() {
            return {
                fetched: false,
                count: 10
            }
        },
        computed: {
            ...mapGetters(['user', 'myCourses']),
        },
        created() {
            this.getMyCourses();
        },
        methods: {
            getMyCourses() {
                const payload = {
                    studentId: this.user.id
                };
                this.$store.dispatch(MY_COURSES_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.fetched = true;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                        this.fetched = true;
                    });
            },
            imagePath(course) {
                return `${process.env.VUE_APP_API}/${course.title}/logo/${course.imageName}.${course.imageFormat}`;
            }
        },
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity ease .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .header {
        padding: 30px 106px;
        background-color: #f7f9fa;
    }
    .header-title {
        font-size: 30px;
        font-weight: 400;
        line-height: 1.287;
        margin: 0;
        text-align: left;
    }

    .my-courses-container {
        padding: 25px 60px;
    }

    .card-wrapper {
        display: flex;
        flex-wrap: wrap;
        /*border: 1px solid #737778;*/
    }

    .course-card {
        flex: 0 1 22%;
        /*flex-basis: 230px;*/
        position: relative;
        height: 280px;
        margin: 14px;
    }

    .course-card:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: .2s ease;
        pointer-events: none;
        box-shadow: 0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1);
        opacity: 1;
    }

    .course-link {
        text-decoration: none;
        color: #29303b;
        font-size: 15px;
    }

    .image-container {
        width: 100%;
        height: 130px;
    }

    .image {
        width: 100%;
        height: 100%;
    }

    .course-details {
        height: 126px;
        padding: 12px 15px;
        text-align: left;
    }

    .course-title {
        height: 43px;
        font-weight: 800;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }

    .details-instructor {
        height: 35px;
        vertical-align: center;
    }
    .details-instructor p {
        padding-top: 5px;
    }

    .details-bottom {
        height: 35px;
        margin-top: 5px;
    }

    .details-progress {
        background-color: rgba(41,48,59,.25);
        display: block;
        height: 2px;
    }

    .details__start-course {
        display: inline-block;
        margin-top: 5px;
        color: #007791;
    }

</style>
