<template>
    <div>
        <div class="cart-header">
            <h2 class="cart-header-title">Shopping Cart</h2>
        </div>
        <div v-if="fetched && cartCourses.length === 0">
            <p>No courses</p>
        </div>
        <div class="course-container" v-else>
            <div class="courses-list">
                <h3 class="list-title">2 Courses in Cart</h3>
                <CartItem v-bind:key="cartCourse.course.id" v-for="cartCourse in cartCourses" v-bind:course="cartCourse.course"
                    @update-cart="updateCart"/>
            </div>
            <div class="checkout-pane">
                <h3 class="text">Total:</h3>
                <p class="price-text">$100</p>
                <button class="checkout-btn">Check out</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {CART_COURSES_REQUEST} from "@/store/actions";
    import {mapGetters} from "vuex";
    import CartItem from "@/views/student/CartItem";

    export default {
        name: "Cart",
        components: {
            CartItem
        },
        data() {
            return {
                cartCourses: [],
                fetched: false
            }
        },
        created() {
            this.getCoursesInCart();
        },
        updated() {
            console.log('Cart updated');
        },
        methods: {
            getCoursesInCart() {
                const payload = {
                    userId: this.user.id
                };
                this.$store.dispatch(CART_COURSES_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.cartCourses = res.data;
                        this.fetched = true;
                    })
                    .catch(err => { console.log(err); console.log(err.response.data); });
            },
            updateCart(crs) {
                this.cartCourses = this.cartCourses.filter(i => i.course.id !== crs.id);
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>
    .cart-header {
        padding: 30px 106px;
        background-color: #f7f9fa;   /*  #505763;  #f7f9fa;  */
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

    .cart-header-title {
        font-size: 30px;
        font-weight: 400;
        line-height: 1.287;
        margin: 0;
        text-align: left;
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
        background-color: #4CAF50;
        color: white;
        width: 70%;
        margin-top: 20px;
        padding: 15px 25px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 17px;
    }

</style>