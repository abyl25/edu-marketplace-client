<template>
    <div>
        <h2>Account Confirmation page</h2>
        <p>{{ authStatus }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { ACCOUNT_CONFIRMATION } from '../store/actions';

    export default {
        name: "AccountConfirmation",
        computed: {
            ...mapGetters(['confirmed', 'authStatus']),
        },
        mounted() {
            let confirmToken = this.$route.query.token;
            console.log('confirmToken: ' + confirmToken); // eslint-disable-line no-console
            this.$store.dispatch(ACCOUNT_CONFIRMATION, confirmToken).then(() => {
                setTimeout(() => this.$router.push('login'), 2000);
            });
        }
    }
</script>

<style scoped>

</style>