<template>
    <div class="course-card-container">
        <router-link class="course-link" :to="{ path: '/course/' + course.id }">
            <div class="course-card-image-container">
                <img class="course-image" src="../../assets/1.png">
            </div>
            <div class="course-card-content">
                <div class="course-card-content-main">
                    <div class="course-card-content-title">
                        <h4>{{ course.title }}</h4>
                    </div>
                    <div class="course-card-content-description">
                        <span>{{ course.subtitle }}</span>
                        <!--   <span class="course-autor"> | {{ course.instructor.firstName + " " + course.instructor.lastName }} </span>-->
                    </div>
                </div>
            </div>
        </router-link>
        <div class="course-card-content-price">
            <div class="course-price-container">
                <span class="course-price">${{ course.price }}</span>
            </div>
            <div class="remove-course">
                <a class="remove-course-btn" @click="removeCourseFromCart(course)">Remove</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { DELETE_COURSE_FROM_CART_REQUEST } from "@/store/actions";
    import { mapGetters } from "vuex";

    export default {
        name: "CartItem",
        props: ["course"],
        updated() {
            console.log('CartItem updated');
        },
        methods: {
            removeCourseFromCart(course) {
                console.log('remove clicked');
                this.$emit('update-cart', course);
                const payload = {
                    userId: this.user.id,
                    courseId: this.course.id
                };
                // this.$store.dispatch(DELETE_COURSE_FROM_CART_REQUEST, payload)
                //     .then(res => {
                //         console.log(res.data);
                //     })
                //     .catch(err => { console.log(err); console.log(err.response.data); });
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }

    .course-card-container {
        text-align: left;
        display: flex;
        border: 1px solid #f2f3f5;
        border-radius: 1px;
        padding: 10px;
        margin: 10px 0;
    }
    .course-card-container:hover {
        /*background-color: #d0d1d1;*/
    }

    .course-link {
        display: flex;
    }

    .course-card-image-container {
        width: 160px;
        height: 90px;
    }

    .course-image {
        box-shadow: 0 0 0 1px #e8e8eB;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .course-card-content {
        flex: 1;
        display: flex;
        padding: 0 16px;
        min-width: 1px;
    }

    .course-card-content-main {
        display: flex;
        flex-direction: column;
        flex: 5;
        padding-right: 7px;
    }

    .course-card-content-title {
        max-width: 440px;
        padding-bottom: 5px;
        font-size: 17px;
    }

    .course-card-content-description {
        max-width: 440px;
        font-size: 15px;
        padding-bottom: 5px;
        color: #686f7a;
    }

    .course-card-content-price {
        flex: 1;
        padding: 5px 10px;
    }

    .course-price {
        color: #007791; /* #ec5252; */
        font-weight: 700;
    }

    .remove-course {
        margin-top: 5px;
    }
    .remove-course-btn {
        color: #007791;
        font-size: 16px;
        font-weight: 400;
    }
    .remove-course-btn:hover {
        cursor: pointer;
    }

</style>