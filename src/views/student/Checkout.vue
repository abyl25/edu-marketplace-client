<template>
    <div class="checkout-wrapper">
        <h1>Checkout</h1>
        <VCreditCard :trans="translations" @change="creditInfoChanged"/>
        <v-button :onClick="completePayment" myClass="pay-btn green">Pay</v-button>
    </div>
</template>

<script>
    import axios from 'axios';
    import { required, minLength, between } from 'vuelidate/lib/validators';
    import VCreditCard from 'v-credit-card';
    import 'v-credit-card/dist/VCreditCard.css';
    import {mapGetters} from "vuex";
    import {CART_COURSES_REQUEST, EMPTY_CART_REQUEST} from "@/store/actions";
    import Button from "@/components/Button";

    const translations = {
        name: {
            label: 'Аты-жөні',
            placeholder: 'Аты-жөні'
        },
        card: {
            label: 'Карта нөмірі',
            placeholder: 'Карта нөмірі'
        },
        expiration: {
            label: 'Мерзімі'
        },
        security: {
            label: 'SCC коды',
            placeholder: 'Код'
        }
    };

    export default {
        name: "Checkout",
        components: {
            'v-button': Button,
            VCreditCard
        },
        notifications: {
            showToast: {
                title: 'Success',
                message: 'Successful Checkout !',
                type: 'success',
                timeout: 2000
            }
        },
        data() {
            return {
                // translations,
                validationError: null,
                courseIds: [],
                card: {
                    name: '',
                    cardNumber: '',
                    expiration: '',
                    security: ''
                },
                fetched: false
            }
        },
        validations: {
            name: {
                required,
                // minLength: minLength(1)
            },
            cardNumber: {
                required,
                between: between(16, 16)
            },
            expiration: {
                required,
                between: between(5, 5)
            },
            security: {
                required,
                between: between(3, 4)
            }
        },
        created() {
            this.getCoursesInCart();
        },
        methods: {
            creditInfoChanged(values) {
                for (const key in values) {
                    this.card[key] = values[key];
                }
            },
            getCoursesInCart() {
                if (this.cartCourses.length === 0) {
                    console.log('cartCourses empty');
                    const payload = {
                        userId: this.user.id
                    };
                    this.$store.dispatch(CART_COURSES_REQUEST, payload)
                        .then(res => { this.fetched = true;
                            console.log(res.data);
                            this.getCartCoursesIds(this.cartCourses);
                            console.log(this.courseIds);
                        })
                        .catch(err => { this.fetched = true;
                            console.log(err);
                            console.log(err.response.data);
                        });
                } else {
                    console.log('cartCourses not empty');
                    this.getCartCoursesIds(this.cartCourses);
                }
            },
            getCartCoursesIds(cartCourses) {
                cartCourses.forEach(c => {
                    this.courseIds.push(c.course.id);
                });
            },
            completePayment() {
                // Validate the this.$data.card object with any third party or your own validation library.
                // const error = this.validateSomehow(this.$data.card);
                const payload = {
                    userId: this.user.id,
                    courseIds: this.courseIds,
                    name: this.card.name,
                    cardNumber: this.card.cardNumber,
                    expiration: this.card.expiration,
                    security: this.card.security,
                };
                console.log(payload);
                axios.post(`${process.env.VUE_APP_API}/api/courses/multi-register`, payload)
                    .then(res => {
                        console.log(res);
                        this.$store.dispatch(EMPTY_CART_REQUEST);
                        this.showToast({
                            title: 'Successful checkout',
                            message: '',
                            type: 'success',
                            timeout: 3000
                        });
                        this.$router.push('/home/my-courses');
                    })
                    .catch(err => {
                        console.log(err);
                        this.showToast({
                            title: 'Error',
                            message: 'Checkout Failure',
                            type: 'error',
                            timeout: 2000
                        });
                    });
            },
            emptyCart() {

            }
        },
        computed: {
            ...mapGetters(['user', 'cartCourses'])
        }
    }</script>

<style scoped>
    .checkout-wrapper {
        margin-top: 20px;
        margin-bottom: 50px;
    }

</style>
