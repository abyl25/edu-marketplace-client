<template>
    <div class="container">
        <textarea name="" id="" placeholder="Ask question" v-model="text"></textarea>
        <button class="btn comment-btn green" @click="onClick">Submit</button>
<!--        <v-button myClass="comment-btn green">Submit</v-button>-->
    </div>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "Form",
        components: {
            'v-button': Button
        },
        props: {
            placeholder: String
        },
        data() {
            return {
                text: '',
            }
        },
        methods: {
            onClick() {
                const comment = {
                    parentId: null,
                    lectureId: this.$route.params.lecture_id,
                    title: '',
                    content: this.text
                }
                this.$emit('add-comment', comment);
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    textarea {
        border: 1px solid #aaa9a9;
        border-radius: 4px;
        /*width: 90%;*/
        height: 100px;
        margin-bottom: 8px;
        padding: 10px;
        color: #777777;
        font-size: 16px;
        font-family: Lato;
        resize: vertical;
    }
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
    .comment-btn {
        flex: 1;
        border-radius: 4px;
        width: 15%;
        padding: 8px 12px;
        font-size: 14px;
    }
    .green {
        background-color: #5cb85c; /* #4CAF50  */
        transition: background-color 0.15s;
    }
    .green:hover {
        background-color: #4CA333; /*  #45a049; */
    }
</style>
