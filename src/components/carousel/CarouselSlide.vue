<template>
    <transition :name="transition">
        <div v-show="visible" >
            <slot>
            </slot>
        </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
            index: 0
        }
    },
    computed: {
        visible() {
            return this.index == this.$parent.index
        },
        transition() {
            return 'slide-' + this.$parent.direction
            // if(this.$parent.direction){ 
            //     return 'slide-' + this.$parent.direction 
            // }
        }
    }
}
</script>

<style scoped>
    .slide-right-enter-active {
        animation: slideRightIn 1s;
    }

    .slide-right-leave-active {
        animation: slideRightOut 1s;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;

    }

    @keyframes slideRightIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes slideRightOut {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }

    .slide-left-enter-active {
        animation: slideLeftIn 1s;
    }

    .slide-left-leave-active {
        animation: slideLeftOut 1s;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;

    }

    @keyframes slideLeftIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }

    @keyframes slideLeftOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
</style>