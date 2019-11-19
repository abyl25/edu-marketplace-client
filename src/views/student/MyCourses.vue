<template>
    <div>
        <div class="header">
            <h2 class="header-title">My Courses</h2>
        </div>
        <div class="my-courses-container">
            <div class="card-wrapper">
                <div class="course-card" v-for="i in count">
                    <router-link to="/" class="course-link">
                        <div class="image-container">
                            <img class="image" src="../../assets/1.png" alt="">
                        </div>
                        <div class="course-details">
                            <p class="course-title">Python eCommerce | Build a Django eCommerce Web Application</p>
                            <div class="details-instructor">
                                <p>Justin Mitchell</p>
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
    </div>
</template>

<script>
    export default {
        name: "MyCourses",
        data() {
            return {
                count: 10
            }
        }
    }
</script>

<style scoped>
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
        flex: 0 1 22.5%;
        /*flex-basis: 230px;*/
        position: relative;
        height: 260px;
        margin: 12px;
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
        padding: 12px 15px;
        text-align: left;
    }

    .course-title {
        height: 42px;
        font-weight: 800;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }

    .details-instructor {
        height: 30px;
    }

    .details-bottom {
        height: 30px;
        margin-top: 5px;
    }

    .details-progress {
        background-color: rgba(41,48,59,.25);
        display: block;
        height: 2px;
    }

    .details__start-course {
        color: #007791;
    }

</style>