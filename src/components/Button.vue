<template>
    <button class="btn" v-bind:class="myClass" @click="onClick">
        <slot>Button</slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            onClick: {
                type: Function,
                required: true
            },
            myClass: {
                type: String
            }
        }
    }
</script>

<style scoped>
    .btn {
        border: none;
        border-radius: 2px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        /*outline: 0;*/
    }

    .green {
        background-color: #4CAF50;
    }
    .green:hover {
        background-color: #4CA333; /*  #45a049; */
    }

    .edit-btn {
        border-radius: 4px;
        width: 30%;
        margin-top: 30px;
        padding: 15px 50px;
        background-color: #4CAF50;
        font-size: 18px;
    }

    .add-answer-btn {
        border: 1px solid #686f7a;
        border-radius: 2px;
        margin-top: 10px;
        padding: 7px 10px;
        color: #007791;
        font-size: 15px;
        font-weight: 600;
        outline: none;
    }

    .plus-sign {
        margin-right: 5px;
    }

    .save-target-btn {
        margin-top: 5px;
        padding: 12px 40px;
        background-color: #4CAF50;
        font-size: 17px;
        font-weight: 500;
    }

    .add-course-btn {
        padding: 12px 25px;
    }

</style>