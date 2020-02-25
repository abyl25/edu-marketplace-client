<template>
    <button class="btn" v-bind:class="myClass" @click="onClick">  <!--  @click="onClick";  this.$emit('click'); -->
        <slot>Button</slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            onClick: {
                type: Function,
                required: false
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
        /*text-align: center;*/
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        /*outline: 0;*/
    }

    .green {
        background-color: #4CAF50;
        transition: background-color 0.15s;
    }
    .green:hover {
        background-color: #4CA333; /*  #45a049; */
    }

    .red-btn {
        background-color: #E14732;
        transition: background-color 0.15s;
    }
    .red-btn:hover {
        background-color: #E11C20; /*  #45a049; */
    }

    .grey-btn {
        background-color: #b3c9c5;
        transition: background-color 0.15s;
    }
    .grey-btn:hover {
        background-color: #8e9e9b;
    }

    .std-btn {
        border-radius: 4px;
        width: 20%;
        margin-top: 20px;
        padding: 10px 15px;
    }

    .edit-btn {
        border-radius: 4px;
        width: 30%;
        margin-top: 30px;
        padding: 15px 50px;
        background-color: #4CAF50;
        font-size: 18px;
    }

    .pay-btn {
        border-radius: 4px;
        width: 30%;
        margin-top: 15px;
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

    .save-section-btn {
        /*width: 80px;*/
        margin-top: 5px;
        border: 1px solid transparent;
        color: #fff;
        background-color: #007791;
        transition: background-color 0.15s;
    }
    .save-section-btn:hover {
        background-color: #02596b;  /* #00657e; */
    }

    .btn-tertiary {
        color: #007791;
        background-color: transparent;
        border: 1px solid transparent;
        transition: background-color 0.15s;
    }
    .btn-tertiary:hover {
        color: #02333d;
    }

    /* Button size */
    .btn-sm {
        padding: 5px 12px; /* 6px 10px  */
        font-size: 15px;
        line-height: 1.35135;
        border-radius: 2px;
    }

    /* margin */
    .mr {
        margin-top: 5px;
    }

    .btn-left {
        text-align: left;
    }
    .btn-right {
        text-align: right;
    }
</style>
