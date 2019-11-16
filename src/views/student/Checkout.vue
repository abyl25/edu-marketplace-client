<template>
    <div>
        <h3>Check out page</h3>
    </div>
</template>

<script>
    export default {
        name: "Checkout",
        data() {
            return {}
        },
        created() {
            console.log('Checkout created');
            console.log('paymentId: ' + this.$route.query.paymentId);
            console.log('payerId: ' + this.$route.query.payerId);
        },
        mounted() {
            console.log('Checkout mounted');
            console.log('paymentId: ' + this.$route.query.paymentId);
            console.log('payerId: ' + this.$route.query.payerId);
        }
    }
</script>

<style scoped>

</style>