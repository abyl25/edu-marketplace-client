<template>
    <div class="coursePage">
        <div class="aboutCourse">
            <div class="leftItems">
                <div class="title"><h1>{{ this.course.title }}</h1></div>
                <div class="subtopic"><h3>{{ this.course.subtitle }}</h3></div>
                <div class="rating">Rating: 4.5 (22,474 ratings)</div>
                <div class="language">Language: {{ this.course.language }}</div>
            </div>

            <div class="rightItems">
                <div class="price">
                    <h2>Price: ${{ this.course.price }}</h2>
                </div>
                <template v-if="!this.isAuthenticated">
                    <div class="b1">
                        <button class="addtocart" @click="addToCart">Add to cart</button>
                    </div>
                </template>
                <template v-else-if="this.isAuthenticated && isStudent">
                    <div class="b1">
                        <button v-if="!alreadyAddedToCart" class="addtocart" @click="addToCart">Add to cart</button>
                        <router-link to="/cart" v-else class="addtocart">Go to cart</router-link>
                    </div>
<!--                    <div class="b2">-->
<!--                        <button class="buynow" @click="registerToCourse">Register</button>-->
<!--                    </div>-->
                </template>
            </div>
        </div>
        <div class="learning">
            <h2>What you'll learn</h2>
            <ul class="listoflearning">
                <li v-bind:key="goal.id" v-for="goal in course.courseGoals">{{ goal.name.charAt(0).toUpperCase() + goal.name.slice(1) }}</li>
            </ul>
        </div>
        <div class="requirements">
            <h2>Requirements</h2>
            <ul class="listofrequirements">
                <li v-bind:key="req.id" v-for="req in course.courseRequirements">{{ req.name.charAt(0).toUpperCase() + req.name.slice(1) }}</li>
            </ul>
        </div>
        <div class="description">
            <h2>Description</h2>
            <p>{{ this.course.description }}</p>
        </div>
        <div class="aboutProf">
            <div class="instructor">
                <div class="ins"><h2>Instructor</h2></div>
                <div class="namesurname"><h3>{{ this.course.instructor.firstName + ' ' + this.course.instructor.lastName}}</h3></div>
                <div class="shortdes">Works on Firmware and Embedded Engineering</div>
                <div class="bio">Best Selling Microcontroller programming and RTOS course creators having over 16,000+ active students and dedicated Co-instructor team to help you in your Embedded Programming Journey.</div>
            </div>
            <div class="profRating">
                <div class="instructorRating">Instructor Rating: 4.5</div>
                <div class="reviews">Reviews: 8,398</div>
                <div class="students">Students: 28,923</div>
                <div class="courses">Courses: 8</div>
            </div>
        </div>
    </div> 
</template>

<script>
import { ADD_COURSE_TO_CART_REQUEST, COURSE_REQUEST, REGISTER_TO_COURSE_REQUEST } from "@/store/actions";
import { mapGetters } from "vuex";

export default {
    name: "CourseDetails",
    data() {
        return {
            course: {},
            alreadyAddedToCart: false
        }
    },
    async created() {
        await this.getCourseDetails();
        this.checkIfAlreadyAddedToCart();
    },
    notifications: {
        showToast: {
            title: 'Success',
            message: 'Course Edited!',
            type: 'success',
            timeout: 2000
        }
    },
    methods: {
        checkIfAlreadyAddedToCart() {
            if (this.isAuthenticated) {
                console.log(this.user.cart);
                const exists = this.user.cart.cartItems.filter(i => i.course.id === this.course.id).length > 0;
                console.log(exists);
                if (exists) {
                    this.alreadyAddedToCart = true;
                }
            }
        },
        getCourseDetails() {
            return new Promise((resolve, reject) => {
                const courseId = this.$route.params.id;
                // this.course = this.courses.filter(c => c.id == courseId);
                this.$store.dispatch(COURSE_REQUEST, courseId)
                    .then(res => {
                        console.log(res.data);
                        this.course = res.data;
                        resolve(res);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                        reject(err);
                    });
            });
        },
        addToCart() {
            if (!this.isAuthenticated) {
                this.$router.push({ path:'/auth', query: { redirect: this.$route.path } });
                console.log('executing after router redirect');
                return;
            }
            const payload = {
                userId: this.user.id,
                courseId: this.$route.params.id
            };
            this.$store.dispatch(ADD_COURSE_TO_CART_REQUEST, payload)
                .then(res => {
                    console.log(res.data);
                    this.alreadyAddedToCart = true;
                    this.showToast({
                        title: 'Course Added to Cart',
                        message: '',
                        type: 'success',
                        timeout: 2000
                    });
                })
                .catch(err => { console.log(err); console.log(err.response.data); });
        },
        registerToCourse() {
            const payload = {
                studentId: this.user.id,
                courseId: this.$route.params.id,
                price: this.course.price
            };
            this.$store.dispatch(REGISTER_TO_COURSE_REQUEST, payload)
                .then(res => {
                    console.log(res.data);
                    this.showToast({
                        title: 'Course Registered',
                        message: '',
                        type: 'success',
                        timeout: 2000
                    });
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                    if (err.response.data === 'Student already purchased this course') {
                        this.showToast({
                            title: 'Registration Failure',
                            message: 'Already registered to this course',
                            type: 'error',
                            timeout: 2000
                        });
                    } else {
                        this.showToast({
                            title: 'Registration Failure',
                            message: '',
                            type: 'error',
                            timeout: 2000
                        });
                    }

                });
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user', 'courses']),
        isStudent() {
            return this.user.roles[0].name === 'Student';
        }
    }
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .coursePage {
        /*padding: 40px 80px;*/
        /*background-color: #f7f9fa;*/
    }

    .aboutCourse {
        background-color: #218EA0;   /*  #32ada1; #51f0e0; #218EA0; */
        display: flex;
        padding: 40px 80px;
        color: aliceblue;
    }

    .leftItems {
        text-align: left;
        width: 800px;
    }

    .title {
        margin-bottom: 20px;
    }

    .rightItems {
        position: relative;
        left: 170px;
    } 

    .b1 {
        padding: 20px 0 10px 0;
    }

    .addtocart {
        background-color: #FF5740; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        list-style: none;
        border-radius: 5px;
        width: 145px; 
    }

    .addtocart:hover {
        background-color: #FF6A55;
        cursor: pointer;
    }

    .buynow {
        background-color: white; /* Green */
        border: none;
        color: #493D35 ;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        list-style: none;
        border-radius: 5px;
        width: 145px;
    }

    .buynow:hover {
        background-color: #85DA60;
        cursor: pointer;
    }

    button:focus {
        outline: 0;
    } 

    .rating {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .learning {
        padding: 40px 200px 20px 100px;
        text-align: left;
        /*background: white; !* #514161; *!*/
        background-color: #f7f9fa;
        /*color: aliceblue;*/
    }

    ul {
        margin: 20px 100px 0 0;
    }
    ul li {
        margin: 5px;
    }

    .requirements {
        padding: 20px 200px 20px 100px;
        text-align: left;
        /*background-color: white;  !*  #148D67; *!*/
        background-color: #f7f9fa;
        /*color: aliceblue;*/
    }

    .description {
        padding: 20px 200px 20px 100px;
        text-align: left;
        background-color: #f7f9fa;
    }

    .description h2 {
        padding-bottom: 20px;
    }

    .aboutProf {
        display: flex;
        padding: 30px 0 40px 100px;
        /*background-color: white; !* #218EA0; *!*/
        background-color: #f7f9fa;
        /*color: aliceblue;*/
        text-align: left;
    }    

    .instructor {
        width: 900px;
    }

    .namesurname {
        padding: 10px 0 10px 0;
    }

    .profRating {
        padding: 50px 0 0 100px;
    }
</style>
