<template>
    <div>
        <h2>Cart</h2>
    </div>
</template>

<script>
    import { CART_COURSES_REQUEST } from "@/store/actions";
    import { mapGetters } from "vuex";

    export default {
        name: "Cart",
        data() {
            return {
                cartCourses: []
            }
        },
        created() {
            this.getCoursesInCart();
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
                    })
                    .catch(err => { console.log(err); console.log(err.response.data); });
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>

</style>