<template>
    <div class="course">
        <router-link class="course-link" :to="{ path: '/course/' + course.id }">
            <div class="course-cardcontainer">
                <div class="course-card-imagecontainer">
                    <img class="course-image" src="../../assets/1.png" v-if="!hasImage" width="240" height="135">
                    <img :src="'http://37.18.30.105:6600/upload_images/' + course.image_name + '.png'" alt="" v-else width="180" height="120">
                </div>
                <div class="course-card-content">
                    <div class="course-card-content-title">
                        <h4>{{ course.title }}</h4>
                    </div>
                    <div class="course-card-content-duration">
                        <span class="course-card-content-duration-lecture">75 Lectures</span>
                        <span class="course-card-content-duration-hours">12.5 hours</span>
                        <span class="course-card-content-duration-level">{{ course.level }}</span>
                    </div>
                    <div class="course-card-content-description">
                        <span>
                            {{ course.subtitle }}
                        </span>
                        <span class="course-autor"> | {{ course.instructor.firstName + " " + course.instructor.lastName }} </span>
                    </div>
                    <div class="course-card-content-price-rating">
                        <div class="course-price-container">
                            <span class="course-price">
                                {{course.price}}$
                            </span>
                        </div>
                        <div class="course-rating-container">
                            <div class="course-rating">
                                <div><span class="star-rating">4.8</span></div>
                                <span class="number-of-raters">(1399 raters)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div> 
</template>

<script>
export default {
    name: "CourseItem",
    props: ["course"],
    computed: {
        hasImage() {
            return this.course.image_name;
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }

    /* .allcoursecontainer {
        display: block;
        width: 80%;
        padding-left: 20px;
    } */

    .course {
        position: relative;
        /*padding: 20px 0;*/
    }

    .course:hover .course-cardcontainer {
        background-color: #d0d1d1;
    }

    .course a {
        display: block;
        /*padding: 20px 0;*/
        margin: 20px 0;
    }

    .course-cardcontainer {
        text-align: left;
        display: flex;
        position: relative;
        border-bottom: 1px solid #f2f3f5;
        padding: 15px 0 8px 8px;
    }

    .course-card-imagecontainer {
        width: 210px;
        height: 100px;
        margin-bottom: 16px;
    }

    .course-image {
        box-shadow: 0 0 0 1px #e8e8eB;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .course-card-content {
        position: relative;
        padding: 0 16px;
        flex: 1;
        min-width: 1px;
    }

    .course-card-content-title, .course-card-content-duration, .course-card-content-description {
        max-width: 440px;
    }

    .course-card-content-duration {
        display: flex;
        flex-wrap: wrap;
    }

    .course-card-content-duration-lecture, .course-card-content-duration-hours, .course-card-content-duration-level {
        margin-right: 10px;
        margin-left: 0;
    }

    .course-card-content-description {
        font-size: 13px;
        color: #686f7a;
    }

    .course-card-content-price-rating {
        top: 0;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 15px;
        right: 20px;
        text-align: right;
    }

    .course-rating-container {
        margin-bottom: 0;
        margin-top: 16px;
    }

    .course-rating {
        flex-direction: column;
        align-items: flex-end;
    }

</style>