<template>
    <div class="form-container">
        <template v-if="editComment">
            <textarea name="" :placeholder="placeholder" v-model="editComment.content" :class="setTextAreaWH ? 'reply-wh' : ''"></textarea>
            <button class="btn comment-btn green" @click="onEdit(editComment)">Edit</button>
        </template>
        <template v-else>
            <textarea name="" :placeholder="placeholder" v-model="content" :class="setTextAreaWH ? 'reply-wh' : ''"></textarea>
            <button class="btn comment-btn green" @click="onClick">Submit</button>
        </template>
    </div>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "Form",
        components: {
            'v-button': Button
        },
        props: ['placeholder', 'setTextAreaWH', 'editComment'],
        data() {
            return {
                content: '',
            }
        },
        methods: {
            onClick() {
                if (!this.content.trim()) return;
                const comment = {
                    title: '',
                    content: this.content.trim()
                }
                this.$emit('add-comment', comment);
                this.content = '';
            },
            onEdit(editComment) {
                if (!editComment.content.trim()) return;
                this.$emit('edit-comment', editComment);
            }
        }
    }
</script>

<style scoped>
    .form-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    textarea {
        border: 1px solid #aaa9a9;
        border-radius: 4px;
        /*width: 90%;*/
        height: 80px;
        margin-bottom: 8px;
        padding: 10px;
        color: #777777;
        font-size: 16px;
        font-family: Lato;
        resize: vertical;
    }
    .reply-wh {
        height: 50px;
        width: 80%;
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
