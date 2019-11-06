<template>
    <div>
<!--        <h2>Account Confirmation page</h2>-->
        <h3 class="confirm-status">{{ authStatus }}</h3>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { ACCOUNT_CONFIRMATION } from '../../store/actions';

    export default {
        name: "AccountConfirmation",
        computed: {
            ...mapGetters(['confirmed', 'authStatus']),
        },
        mounted() {
            let confirmToken = this.$route.query.token;
            console.log('confirmToken: ' + confirmToken); // eslint-disable-line no-console
            this.$store.dispatch(ACCOUNT_CONFIRMATION, confirmToken).then(() => {
                // setTimeout(() => this.$router.push('login'), 2000);
            });
        }
    }
</script>

<style scoped>
    .confirm-status {
        margin-top: 30px;
        font-size: 20px;
        color: green;
    }
</style>