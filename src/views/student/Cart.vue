<template>
    <div>
        <div class="cart-header">
            <h2 class="cart-header-title">Shopping Cart</h2>
        </div>
        <div v-if="!fetched">
            <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">
        </div>
        <transition name="fade">
            <div v-if="fetched">
                <div class="empty-cart" v-if="this.cartCourses.length === 0">
                    <img src="../../assets/icons8-clear-shopping-cart-100.png" alt="">
                    <p>Your cart is empty. Keep shopping!</p>
                    <button class="shopping-btn" @click="continueShopping">Keep shopping</button>
                </div>
                <div class="course-container" v-else-if="this.cartCourses.length > 0">
                    <div class="courses-list">
                        <h3 class="list-title">{{ this.cartCourses.length }} Course in Cart</h3>
                        <transition-group name="delete-transition">
                            <CartItem v-bind:key="cartCourse.course.id" v-for="cartCourse in this.cartCourses" v-bind:course="cartCourse.course"
                                @remove-course="removeCourseFromCart"/>
                        </transition-group>
                    </div>
                    <div class="checkout-pane">
                        <h3 class="text">Total:</h3>
                        <p class="price-text">{{ totalPrice }}</p>
                        <button class="checkout-btn" @click="checkOut">Check out</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { CART_COURSES_REQUEST, DELETE_COURSE_FROM_CART_REQUEST } from "@/store/actions";
    import {mapGetters} from "vuex";
    import CartItem from "@/views/student/CartItem";
    import axios from 'axios';

    export default {
        name: "Cart",
        components: {
            CartItem
        },
        data() {
            return {
                totalPrice: '',
                fetched: false
            }
        },
        notifications: {
            showToast: {
                title: 'Success',
                message: 'Course Edited!',
                type: 'success',
                timeout: 2000
            }
        },
        created() {
            this.getCoursesInCart();
        },
        methods: {
            continueShopping() {
                this.$router.push('/');
            },
            calculateTotalPrice () {
                let total = 0;
                this.cartCourses.forEach(i => total += i.course.price);
                this.totalPrice = '$' + total;
            },
            getCoursesInCart() {
                const payload = {
                    userId: this.user.id
                };
                this.$store.dispatch(CART_COURSES_REQUEST, payload)
                    .then(res => {
                        // this.cartCourses = res.data;
                        this.fetched = true;
                        console.log(res.data);
                        this.calculateTotalPrice();
                    })
                    .catch(err => {
                        this.fetched = true;
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            removeCourseFromCart(crs) {
                const payload = {
                    userId: this.user.id,
                    courseId: crs.id
                };
                this.$store.dispatch(DELETE_COURSE_FROM_CART_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.showToast({
                            title: 'Removed from cart',
                            message: '',
                            type: 'success',
                            timeout: 2000
                        });
                        this.calculateTotalPrice();
                    })
                    .catch(err => { console.log(err); console.log(err.response.data); });
            },
            checkOut() {
                this.$router.push('/cart/checkout');
                // axios.post('/api/payment/create?total=1')
                //     .then(res => {
                //         console.log(res.data);
                //         if (res.data.status === 'success') {
                //             window.location = res.data.redirectUrl;
                //         }
                //     })
                //     .catch(err => { console.log(err); console.log(err.response.data); });
            }
        },
        computed: {
            ...mapGetters(['user', 'cartCourses'])
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active, .fade-leave-active {
        transition: all ease .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .delete-transition-leave-active { /*  .delete-transition-enter-active, */
        transition: all ease .3s;
    }

    /*  */
    .cart-header {
        padding: 30px 106px;
        background-color: #f7f9fa;   /*  #505763;  #f7f9fa;  */
    }
    .cart-header-title {
        font-size: 30px;
        font-weight: 400;
        line-height: 1.287;
        margin: 0;
        text-align: left;
    }

    .course-container {
        display: flex;
        padding: 30px 90px;
    }

    .courses-list {
        flex: 3;
        /*border: 1px solid #686f7a;*/
    }

    .list-title {
        text-align: left;
        color: #29303b;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.2;
    }

    .checkout-pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        /*width: 250px;*/
        /*border: 1px solid #686f7a;*/
        padding: 30px 30px 30px 50px;
        text-align: left;
    }

    .text {
        font-size: 18px;
        color: #686f7a;
    }

    .price-text {
        margin-top: 5px;
        font-size: 36px;
    }

    .checkout-btn {
        background-color: #ec5252;  /*  #4CAF50;  */
        color: white;
        width: 70%;
        margin-top: 20px;
        padding: 15px 25px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 17px;
    }

    .empty-cart {
        height: 300px;
        padding: 50px;
    }

    .empty-cart p {
        margin-top: 10px;
        font-size: 17px;
    }

    .shopping-btn {
        background-color: #ec5252;
        color: white;
        margin-top: 20px;
        padding: 15px 22px;
        border: none;
        border-radius: 2px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }

</style>
